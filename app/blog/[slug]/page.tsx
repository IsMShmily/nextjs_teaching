const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <div>Blog: {slug}</div>;
};

export default Blog;
