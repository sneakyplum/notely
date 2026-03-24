"use client";

import { createStickyNote } from "@/app/actions";
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


const DashboardClient = ({ viewableStickyNotes }) => {

  const [viewingDate, setViewingDate] = useState(new Date());


  const firstDayOfMonth = startOfMonth(viewingDate); 
  const lastDayOfMonth = endOfMonth(viewingDate);

  const startingDayIndex = getDay(firstDayOfMonth);

  const nextMonth = () => setViewingDate(addMonths(viewingDate, 1));
  const prevMonth = () => setViewingDate(subMonths(viewingDate, 1));




  const calendarDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });





  const [notes, setNotes] = useState(viewableStickyNotes);

  console.log(viewableStickyNotes);

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
              const { target, source } = operation; // 'source' is the note you grabbed

              if (target && source) {
                const droppedOnId = target.id; // e.g., "2026-03-21" or "sidebar"
                const draggedNoteId = source.id; // e.g., "cmmu19..."

                // 1. Tell the UI to move the note locally (for now)
                // We update the state so the .filter() sees the new date
                setNotes((prevNotes) => 
                  prevNotes.map((note) => 
                    note.id === draggedNoteId 
                      ? { ...note, targetDate: droppedOnId === "sidebar" ? null : droppedOnId }
                      : note
                  )
                );

                // 2. TODO: Call a Server Action here to save this change to Prisma!
                // updateNoteDate(draggedNoteId, droppedOnId);
              }
            }}
              >
              
              <Droppable id="sidebar">
                <div className="w-full min-h-32 bg-purple-600 mb-5 p-4 border-2 border-dashed border-purple-300 grid grid-cols-2 gap-2">
                  {notes
                    .filter(note => !note.targetDate) // Only show notes that don't have a date yet
                    .map((note) => (
                      <Draggable 
                        key={note.id} 
                        id={note.id} 
                        color={note.color} 
                        duration={note.duration}
                        workers={note.workers}
                        trade={note.trade}
                      />
                    ))
                  }
                </div>
              </Droppable>

            <div className="grid grid-cols-7 gap-2 p-30 pt-0">
              {calendarDays.map((day) => {
                const dayId = format(day, 'yyyy-MM-dd'); // Unique ID for each day
                

                
                return (
            <Droppable id={dayId} key={dayId}>
                  <div className="border border-black h-60 w-60 p-2 overflow-y-auto">
                    <span className="text-gray-400">{day.getDate()}</span>
                    
                    {/* Map over notes assigned to THIS specific day */}
                    {notes
                      .filter(note => note.targetDate === dayId) 
                      .map((note) => (
                        <Draggable 
                          key={note.id} 
                          id={note.id} 
                          color={note.color} 
                          duration={note.duration}
                          workers={note.workers}
                          trade={note.trade}
                        />
                      ))
                    }
                  </div>
                </Droppable>
                );
              })}
            </div>

          </DragDropProvider>
        </div>
      </div>
      <div>
        <form action={createStickyNote} className="flex flex-col gap-2 p-4 bg-gray-100 rounded">
          <input name="content" placeholder="Task (e.g. Rough-in)" className="border p-2" required />
          <input name="trade" placeholder="Trade (e.g. Electrical)" className="border p-2" required />
          <input name="duration" type="number" placeholder="Task (e.g. 1)" className="border p-2" required />
          <input name="workers" type="number" placeholder="Trade (e.g. 1)" className="border p-2" required />
          {/* The Color Picker */}
          <div className="flex gap-2">
            {['#EAB308', '#3B82F6', '#EF4444', '#22C55E'].map((color) => (
              <label key={color} className="cursor-pointer">
                <input type="radio" name="color" value={color} className="hidden peer" defaultChecked={color === '#EAB308'} />
                <div style={{ backgroundColor: color }} className="w-8 h-8 rounded-full peer-checked:ring-2 ring-black" />
              </label>
            ))}
          </div>

          <Button type="submit">Add Sticky</Button>
        </form>
      </div>
    </main>
  )
}

export default DashboardClient;