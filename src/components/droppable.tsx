import {useDroppable} from '@dnd-kit/react';

function Droppable({id, children}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref} className='bg-blue-300'>
      {children} 

    </div>
  );
}

export default Droppable;