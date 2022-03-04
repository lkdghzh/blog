import React, { useState, useRef, useEffect } from 'react';

const App = () => {
    const fn1=()=>{
        console.log(1)
        return 1;
    }
    const fn2=()=>{
        console.log(2)
        return 2;
    }

    const [flag, setFlag] = useState(false);
  
    function handleClick() {
     
    }
  
    return <button onClick={handleClick}>{flag ? "true" : "false"}</button>;
};
export default App