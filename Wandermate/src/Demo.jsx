import React, { useState, useEffect } from 'react';

function CounterUse() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Component mounted or count changed to: ${count}`);
    return () => {
      console.log('Component unmounted or count changed. Cleaning up...');
    };
  },[count]); // Only re-run the effect if count changes

  const increment = () => {
    setCount(prevCount => prevCount + 1); // Functional update to avoid stale state
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default CounterUse;
