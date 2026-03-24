

import prisma from "@/lib/prisma"
import DashboardClient from "./DashboardClient"



const page = async () => {



  const stickyNote = await prisma.stickyNote.findMany()

  return (
    <div>
      <DashboardClient viewableStickyNotes={stickyNote}/>
    </div>
  )
}

export default page