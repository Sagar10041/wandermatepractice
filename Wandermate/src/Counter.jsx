function Counter() {
    let count = 0;
  
    const increment = () => {
      count += 1;
      console.log(count); // This will increment the count but will not re-render the component.
    };
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }

  export default Counter;