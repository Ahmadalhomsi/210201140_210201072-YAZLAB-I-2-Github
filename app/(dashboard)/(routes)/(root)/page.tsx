import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { Hourglass ,Trophy} from "lucide-react";






import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";






export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4" style={{ fontSize: '30px', fontWeight: 'bold' }}>

      Kurslarım
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 hover:bg-sky-100"
      style={{ fontSize: '20px' }}>
       <InfoCard
          icon={Hourglass}
          label="Devam Eden "
          numberOfItems={coursesInProgress.length}
       />
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 hover:bg-emerald-100"
      style={{ fontSize: '20px' }}>
       <InfoCard
          icon={Trophy} 
          label="Tamamlanmış"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}