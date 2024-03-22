import React from 'react'

const DebugListComponent = ({ id, element}) => {

   try {
     console.log( `DebugListComponent id = ${id} element =${JSON.stringify(element)}`);
   } catch (error) {
    console.log( "DebugListComponent id or element is undefined");
   }
  return (
    <div>`DebugListComponent id = ${id} element =${JSON.stringify(element)}`</div>
  )
}

export default DebugListComponent