"use client";

const button = () => {
  const click = () => {
    console.log("NEXT_PUBLIC_SIGN", process.env.NEXT_PUBLIC_SIGN);
  };
  return (
    <button onClick={click} className="bg-blue-500 text-white p-2 rounded">
      Click me
    </button>
  );
};

export default button;
