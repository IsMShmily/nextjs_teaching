import ClientComponent from "../components/ClientComponents";

// 默认为服务端组件
const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      Server Component - {id}
      <ClientComponent />
    </div>
  );
};

export default Home;
