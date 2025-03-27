import { cookies } from "next/headers";

const Dy1 = async () => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  console.log(theme);

  return <div>Dy1</div>;
};

export default Dy1;
