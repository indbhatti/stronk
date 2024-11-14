"use client";

import { getest } from "@/serverActions/getdata";

const TestComponent = () => {
  const handleClick = async () => {
    getest();
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default TestComponent;
