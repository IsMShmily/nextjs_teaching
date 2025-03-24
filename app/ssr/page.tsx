const SSR = async () => {
  const getData = async () => {
    "use server";
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
  };

  const data = await getData();
  return <div>{data ? JSON.stringify(data) : "loading..."}</div>;
};

export default SSR;
