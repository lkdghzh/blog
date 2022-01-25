import React, { useEffect, useState } from 'react';

function RepeatRender() {
  const [count, setCount] = useState(0)

  console.log('main', count)
  useEffect(() => {
    setCount(count + 1)
    // setCount(c => c + 1)
    console.log('effect', count)
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
