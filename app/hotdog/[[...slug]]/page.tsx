const HotDog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>HotDog: {slug}</div>;
};

export default HotDog;
