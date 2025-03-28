export default function Home() {
  console.log(process.env.DB_USER);
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      hello next.js Home Page
    </div>
  );
}
