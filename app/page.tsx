const fetch_getNumber = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
};

export default async function Home() {
  const num: number = await fetch_getNumber();
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      hello next.js Home Page
      <div>num: {num}</div>
    </div>
  );
}
