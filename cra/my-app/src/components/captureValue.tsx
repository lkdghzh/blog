import React, { useState, useRef, useEffect } from 'react';

const App = () => {
    const [flag, setFlag] = useState(false);
    debugger
    const flagRef = useRef(flag);
    flagRef.current = flag;
  
    function handleClick() {
      setFlag(!flagRef.current);
  
      setTimeout(() => {
        setFlag(!flagRef.current);
      }, 2000);
    }
  
    return <button onClick={handleClick}>{flag ? "true" : "false"}</button>;
};
export default App