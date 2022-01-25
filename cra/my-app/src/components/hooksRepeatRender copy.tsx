import React, { useEffect, useState } from 'react';

function RepeatRender() {
  const [count, setCount] = useState(0)
  
  console.log('main', count)
  // useEffect(() => {
  //   setCount(count + 1)
  //   console.log('effect',count)
  // }, []);
  useEffect(() => {
    setInterval(() => {
      // setCount(count + 1)
      setCount(count=> + count+1)
      console.log('timer effect', count)
    }, 1000)
  }, []);

  return (
    <div className="repeat">
      {
        console.log('render', count)
      }
      {count}
    </div>
  );
}

export default RepeatRender;
