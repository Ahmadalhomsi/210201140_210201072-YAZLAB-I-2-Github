"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import toast from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignOutButton } from "@clerk/nextjs";


interface UserType {
  userId: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  email: string;
  pnumber: string;
  isEnabled: boolean;
}

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  userId: z.string().min(1, {
    message: "userId is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  surname: z.string().min(1, {
    message: "Surname is required",
  }),
  dob: z.string().min(1, {
    message: "Date of birth is required",
  }),
  gender: z.string().min(1, {
    message: "Gender is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
  pnumber: z.string().min(1, {
    message: "Phone number is required",
  }),
  isEnabled: z.boolean(),
});

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      name: '',
      surname: '',
      dob: '',
      gender: '',
      email: '',
      pnumber: '',
      isEnabled: true,
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/ahmad/readInfo'); // Replace with your API endpoint
        setUserInfo(response.data);
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);


  const { isSubmitting, isValid } = form.formState;

  const onSubmitDialog = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SubmitX Button Pressed");
      const response = await axios.post("/api/ahmad/updateInfoSpec", values);
      toast.success('User updated successfully');
      window.location.reload();
    } catch (error) {
      console.log('Error updating user:', error);

      // Display a more detailed error message
      toast.error(`Error: ${error}`);
    }
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get("/api/ahmad/userList");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleToggleUser = async (userId: string, isEnabled: boolean) => {
    // ... (unchanged)
  };

  const handleEditUser = (user: UserType) => {
    console.log('Editing user:', user);

    form.reset({
      userId: user.userId,
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      pnumber: user.pnumber,
      isEnabled: user.isEnabled,
    });

    // Enable the userId field for editing
    const userIdField = document.getElementById('userId') as HTMLInputElement | null;
    if (userIdField) {
      userIdField.readOnly = false;
    }

    // Set the editingUser to the user
    setEditingUser(user);
    setIsDialogOpen(true);
  };


  const handleCancelEdit = () => {
    console.log('Canceling edit');
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
        <br />
      <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Kullanıcı Kontrol Paneli</h1>
<br />  
      <Table>
        <thead>
          <tr>
            <th>Kullanıcı ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Doğum tarihi</th>
            <th>Cinsiyet</th>
            <th>Email</th>
            <th>Telefon numarası</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserType) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.pnumber}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isEnabled}
                  onChange={(event) =>
                    handleToggleUser(user.userId, event.target.checked)
                  }
                />
              </td>
              <td>
                <Button onClick={() => handleEditUser(user)}>Düzenle</Button>
                {/* Add more action buttons as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

     
      <SignOutButton >
        <Button
        type="button"
        
      >
        Hesap oluştur
      </Button>
      </SignOutButton>
               


      <Dialog open={isDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Düzenle</DialogTitle>
        <DialogContent>
          {/* Add your user editing form or components here */}
          {/* Example: */}
          <Label>
            User ID:
            {editingUser ? (
              <span>{editingUser.userId}</span>
            ) : (
              <Input
                type="text"
                {...form.register('userId')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Kullanıcı ID"
                readOnly
              />
            )}
          </Label>
        </DialogContent>
        <DialogActions>

          <h1>U</h1>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '400px', // Set a maximum width for the form
              margin: '0 auto', // Center the form horizontally
            }}
            onSubmit={form.handleSubmit(onSubmitDialog)}
          >
            <Label>
              İsim:
              <Input
                type="text"
                {...form.register('name')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.name) || ''}
              />

            </Label>

            <Label>
              Soyisim:
              <Input
                type="text"
                {...form.register('surname')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.surname) || ''}
              />
            </Label>

            <Label>
              Doğum Tarihi:
              <Input
                type="text"
                {...form.register('dob')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.dob) || ''}
              />
            </Label>

            <Label>
              Cinsiyet:
              <Input
                type="text"
                {...form.register('gender')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.gender) || ''}
              />
            </Label>

            <Label>
              E-posta Adresi:
              <Input
                type="text"
                {...form.register('email')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.email) || ''}
              />
            </Label>

            <Label>
              Telefon Numarası:
              <Input
                type="text"
                {...form.register('pnumber')}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder={(editingUser && editingUser.pnumber) || ''}
              />
            </Label>
            <label>
              Is Enabled:
              <input
                type="checkbox"
                {...form.register('isEnabled')}
                defaultChecked={(editingUser && editingUser.isEnabled) || false}
              />
            </label>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}

            >
              Düzenle
            </Button>
          </form>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default UserManagement;
