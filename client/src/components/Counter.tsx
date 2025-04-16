import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>🧮 Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increase</button>
      <button onClick={() => setCount(count - 1)}>➖ Decrease</button>
    </div>
  );
};

export default Counter;
