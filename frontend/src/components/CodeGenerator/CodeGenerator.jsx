import { useState } from "react";
function Codegenerator(){
    const codeOptions=["JavaScript","Java","Python","C++"]


    return (
        <>
        {
         codeOptions.map((option)=>{
            return <button>{option}</button>
         })
        }
        </>
    )
}



export default Codegenerator