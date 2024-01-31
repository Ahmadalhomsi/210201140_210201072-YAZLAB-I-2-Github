"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  // title alanını kaldırın, çünkü artık giriş yapmadan devam ediyoruz
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // title alanını kaldırın
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async () => {
    try {
      // Kurs oluşturulduktan sonra direkt olarak kurs sayfasına yönlendirin
      const response = await axios.post("/api/courses", { title: "" });
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (error) {
      console.error("Kurs oluşturma hatası:", error);
      toast.error("Kurs oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-2xl flex md:items-center md:justify-center h-full p-6">
      <div>
        Kurs oluşturmak istiyor musunuz?
        <p className="text-sm text-slate-600"></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            {}
            <div className="flex items-center gap-x-2 text-white">
              <Link href="/">
                <Button
                  style={{ backgroundColor: "rgb(255, 100, 100)" }}
                  type="button"
                  variant="ghost"
                >
                  İptal
                </Button>
              </Link>
              <Button
                style={{ backgroundColor: "green" }}
                type="submit"
                disabled={isSubmitting}
              >
                {/* Kurs ekle butonuna ikon ekleyin */}
                <span className="flex items-center">
                  Devam et
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;