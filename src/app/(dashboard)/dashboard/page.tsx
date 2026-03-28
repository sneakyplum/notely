

import prisma from "@/lib/prisma"
import DashboardClient from "./DashboardClient"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";



const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
    
  })

  
  const userId = session?.user?.id;



  const stickyNotes = await prisma.stickyNote.findMany({
    where: {
      userId: userId, // "Only give me notes where the owner ID matches my ID"
    },
  });


  return (
    <div>
      <DashboardClient 

      viewableStickyNotes={stickyNotes}/>
    </div>
  )
}

export default page