/**
 * generateStaticParams
 * 与动态路由段结合使用，在构建时静态生成路由，而不是在请求时按需生成。
 *
 * 取代了 Pages Router 中的 getStaticPaths 函数。
 */
export const generateStaticParams = async () => {
  // 在构建时获取所有文章数据
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // 将文章数据转换为路由参数格式
  // 返回一个包含所有可能的 id 值的数组
  return posts.map((post: { id: { toString: () => any } }) => ({
    id: post.id.toString(), // 确保 id 是字符串格式
  }));
};

/**
 * 页面组件，接收动态路由参数
 * @param params - 包含路由参数的对象，这里是 { id: string }
 */
const Ssg3 = async ({ params }: { params: { id: string } }) => {
  // 解构获取路由参数中的 id
  const { id } = await params;

  // 根据 id 获取具体的文章数据
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());

  // 渲染文章内容
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Ssg3;
