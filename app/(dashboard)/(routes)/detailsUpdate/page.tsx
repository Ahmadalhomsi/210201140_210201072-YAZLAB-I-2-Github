'use client'

import axios from "axios";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "İsim gerekli",
  }),
  surname: z.string().min(1, {
    message: "Soyisim gerekli",
  }),
  dob: z.string().min(1, {
    message: "Doğum tarihi gerekli",
  }),
  gender: z.string().min(1, {
    message: "Cinsiyet gerekli",
  }),
  email: z.string().min(1, {
    message: "Email gerekli",
  }),
  pnumber: z.string().min(1, {
    message: "Telefon numarası gerekli",
  }),
  isEnabled: z.boolean(),
});

const UpdatePage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

      try {
        const responseV = await axios.get('/api/ahmad/userIsEnabled/');

        console.log('status:', responseV.data.user.isEnabled);

        if (!responseV.data.user.isEnabled) {
          // Redirect the user to the blocked site
          router.push(`/blockedUser`);

        }
      } catch (error) {
        console.log('Axios error:', error);
        // Handle error as needed, e.g., show an error message to the user
      }

    };

    fetchUserInfo();
  }, []);


  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submite Buttonaaaa");
      const response = await axios.post("/api/ahmad/updateInfo", values);
      router.push(`./${response.data.id}`);
      toast.success('User updated successfully');
      router.push('/'); // Change '/success' to your success page
    } catch (error) {
      console.log('Error updating user:', error);

      // Display a more detailed error message
      toast.error(`Error: ${error}`);
    }
  }


  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Güncelleme sayfası</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px', // Set a maximum width for the form
          margin: '0 auto', // Center the form horizontally
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Label>
          İsim:
          <br />
          <Input
            type="text"
            {...form.register('name')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['name'] || 'İsim' : 'İsim'}
          />

        </Label>

        <Label>
          Soyad:
          <br />
          <Input
            type="text"
            {...form.register('surname')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['surname'] || 'Soyisim' : 'Soyisim'}
          />
        </Label>

        <Label>
          Doğum Tarihi:
          <br />
          <Input
            type="text"
            {...form.register('dob')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['dob'] || 'Doğum tarihi' : 'Doğum tarihi'}
          />
        </Label>

        <Label>
          Cinsiyet:
          <br />
          <Input
            type="text"
            {...form.register('gender')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['gender'] || 'Cinsiyet' : 'Cinsiyet'}
          />
        </Label>

        <Label>
          E-posta Adresi:
          <Input
            type="text"
            {...form.register('email')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['email'] || 'Email' : 'Email'}
          />
        </Label>

        <Label>
          Telefon Numarası:
          <Input
            type="text"
            {...form.register('pnumber')}
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder={userInfo ? userInfo['pnumber'] || 'Telefon numarası' : 'Telefon nuamrası'}
          />
        </Label>


        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Onayla 
        </Button>
      </form>


    </div>
  );
};


export default UpdatePage;
