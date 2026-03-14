
import { 
  startOfMonth, 
  endOfMonth, 

  eachDayOfInterval 
} from "date-fns";

const Dashboard = () => {

const today = new Date();

// 1. Get the start and end of the grid (including padding for the week)
const firstDayOfMonth = startOfMonth(today); // The 1st
const lastDayOfMonth = endOfMonth(today);

// 2. This gives you an array of every day to render in the grid
const calendarDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

//=> "3 days ago"

  return (
    <main>
      <div></div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => (
          <div key={day.toString()} className="border h-32 w-full p-2">
            {day.getDate()}
            {/* This is where you would drop your Sticky Notes! */}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Dashboard