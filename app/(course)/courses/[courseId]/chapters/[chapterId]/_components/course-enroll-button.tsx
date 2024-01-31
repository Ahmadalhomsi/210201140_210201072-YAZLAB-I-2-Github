"use client";

import axios from "axios";
import { useState } from "react";




import { Button } from "@/components/ui/button";


interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      console.log("Backend response:", response);
  
      // Check if the response indicates a successful enrollment
    if (response.status === 200) {
      window.location.reload();

    } else {
      // Optionally, handle other response statuses if needed
    }
  
    } catch (error) {
      console.log("Kayıt başarısız", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto hover:bg-green-700"
      style={{ width: '160px',height:'40px' }}
    >
      Kayıt ol
    </Button>
  )
}