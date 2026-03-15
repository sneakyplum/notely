"use client";

import { Button } from "@/components/ui/button";
import { 
  startOfMonth, 
  endOfMonth, 

  eachDayOfInterval, 
  subMonths,
  addMonths,
  format
} from "date-fns";
import { useState } from "react";

const Dashboard = () => {

  const today = new Date();
  const [viewingDate, setViewingDate] = useState(new Date());

  // 1. Get the start and end of the grid (including padding for the week)
  const firstDayOfMonth = startOfMonth(viewingDate); // The 1st
  const lastDayOfMonth = endOfMonth(viewingDate);



  const nextMonth = () => setViewingDate(addMonths(viewingDate, 1));
  const prevMonth = () => setViewingDate(subMonths(viewingDate, 1));



  // 2. This gives you an array of every day to render in the grid
  const calendarDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

//=> "3 days ago"

  return (
    <main>

      <div className="flex-col text-2xl justify-center items-center p-10">
        <div className="flex justify-center items-center gap-4">
          <h2>{format(viewingDate, 'MMMM yyyy')}</h2>
          
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button onClick={prevMonth} className="cursor-pointer text-2xl">Previous Month</Button>
          <Button onClick={nextMonth} className="cursor-pointer text-2xl">Next Month</Button>
        </div>

      </div>
      <div className="grid grid-cols-7 gap-2 p-30">
        {calendarDays.map((day) => (
          <div key={day.toString()} className="border h-60 w-full p-2">
            {day.getDate()}
            {/* This is where you would drop your Sticky Notes! */}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Dashboard