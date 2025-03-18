const Shop = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>Shop: {slug.toString()}</div>;
};

export default Shop;
