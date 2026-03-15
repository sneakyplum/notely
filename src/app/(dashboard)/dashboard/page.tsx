"use client";

import Draggable from "@/components/draggable";
import Droppable from "@/components/droppable";
import { Button } from "@/components/ui/button";
import { DragDropProvider } from "@dnd-kit/react";
import { 
  startOfMonth, 
  endOfMonth, 

  eachDayOfInterval, 
  subMonths,
  addMonths,
  format,
  getDay
} from "date-fns";
import { useState } from "react";


const Dashboard = () => {

  const [viewingDate, setViewingDate] = useState(new Date());


  const firstDayOfMonth = startOfMonth(viewingDate); 
  const lastDayOfMonth = endOfMonth(viewingDate);

  const startingDayIndex = getDay(firstDayOfMonth);

  const nextMonth = () => setViewingDate(addMonths(viewingDate, 1));
  const prevMonth = () => setViewingDate(subMonths(viewingDate, 1));




  const calendarDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const [isDropped, setIsDropped] = useState(false);

  const [stickyPosition, setStickyPosition] = useState<string | null>(null);

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
    <div className="grid grid-cols-7 gap-2 px-30 mb-2">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
        <div key={label} className="text-center font-bold text-sm uppercase text-black">
          {label}
        </div>
      ))}
    </div>

      <div className="grid grid-cols-7 gap-2 p-30 pt-0">

        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} className="h-60 w-full bg-gray-50/50 border border-dashed border-gray-200" />
        ))}



      </div>

      <div>

        <div >
          <DragDropProvider
            onDragEnd={(event) => {
              const { operation } = event;
              const { target } = operation;

              if (target) {
                // 'target.id' will be the ID of the Droppable day you hovered over
                setStickyPosition(target.id as string);
              }
            }}
          >
            {/* The "Sidebar" where the sticky starts */}
            <div className="w-30 h-30 bg-purple-600">
              {/* Only show here if it hasn't been dropped on a day yet */}
              {!stickyPosition && <Draggable  />}
            </div>

            <div className="grid grid-cols-7 gap-2 p-30 pt-0">
              {calendarDays.map((day) => {
                const dayId = format(day, 'yyyy-MM-dd'); // Unique ID for each day
                
                return (
                  <Droppable id={dayId} key={dayId}>
                    <div className="border border-black h-60 w-60 p-2">
                      {day.getDate()}
                      
                      {/* If this specific day's ID matches our state, render the sticky here */}
                      {stickyPosition === dayId && <Draggable />}
                    </div>
                  </Droppable>
                );
              })}
            </div>
          </DragDropProvider>
        </div>
      </div>

    </main>
  )
}

export default Dashboard