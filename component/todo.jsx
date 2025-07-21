import React, { useState } from 'react'

export default function todo() {
    const[task,settask]=useState(" ");
    
    const[todos,settodos]=useState([]);
    const handleadd=()=>{
        settodos([...todos,task]);
        console.log("added",todos)
        settask('   ')
    }
   const handledelete = (index) => {
  const updatedtodos=[todos];
  updatedtodos.splice(index);
  settodos(updatedtodos);
};
  return (
    <div>
     <input type="text" value={task} onChange={(e)=>settask(e.target.value)} />
     <button onClick={handleadd}>
        Add
     </button>
     <ul>
        {todos.map((items,index)=>(
     <li key={index}>{items}
      <button onClick={()=>handledelete(index)}> delete </button>
     </li>
            )
        

            )
         
        }
        
     </ul>
    </div>
  )
}
