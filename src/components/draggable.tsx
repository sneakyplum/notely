import { useDraggable } from '@dnd-kit/react';

// 1. Correct the types: duration and workers are numbers!
interface DraggableProps {
  id: string;
  color: string;
  trade: string;
  duration: number; 
  workers: number;
}

function Draggable({ id, color, trade, duration, workers }: DraggableProps) {
  // 2. Pass the actual 'id' prop into the hook
  const { ref } = useDraggable({
    id: id, 
  });

  return (
    <button className='w-30 h-30' ref={ref} style={{ backgroundColor: color || '#fbbf24' }}>
      {trade}
      {duration}
      {workers}
    </button>
  );
}

export default Draggable;