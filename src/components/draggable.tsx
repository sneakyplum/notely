
import {useDraggable} from '@dnd-kit/react';


function Draggable({ id, color, trade, duration, workers}: { id: string, color: string, trade: string, duration: string, workers: string}) {




  const {ref} = useDraggable({
    id,
  });

  return (
    <button ref={ref} className='w-25 h-25 bg-amber-400' style={{ backgroundColor: color || '#fbbf24'}}>
      {trade}
      {duration}
      {workers}
    </button>
  );
}

export default Draggable;