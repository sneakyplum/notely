import {useDraggable} from '@dnd-kit/react';

function Draggable() {
  const {ref} = useDraggable({
    id: 'draggable',
  });

  return (
    <button ref={ref} className='flex bg-amber-400'>
      Draggable
    </button>
  );
}

export default Draggable;