interface Post {
  id: string;
  title: string;
  content: string;
}

/**
 * revalidate 是 Next.js 的特殊配置
 * 用于设置页面的重新验证时间（以秒为单位）
 * 这里设置为 60 秒，意味着：
 * 1. 页面最多每 60 秒重新生成一次
 * 2. 在 60 秒内的所有访问都会使用缓存的版本
 * 3. 60 秒后的第一个请求会触发重新生成
 */
export const revalidate = 60;

/**
 * dynamicParams 配置项决定了如何处理未预渲染的路径
 * true: 对未预渲染的路径进行按需服务端渲染
 * false: 对未预渲染的路径返回 404
 *
 * 这里设置为 true，表示：
 * - 构建时只生成 generateStaticParams 指定的路径
 * - 但允许在运行时处理其他动态路径
 */
export const dynamicParams = true;

/**
 * generateStaticParams 用于构建时预渲染页面
 * 返回一个包含所有需要预渲染的路径参数的数组
 * 这些页面会在构建时生成静态HTML
 */
export async function generateStaticParams() {
  // 获取所有文章数据
  const posts: Post[] = await fetch("https://api.vercel.app/blog").then((res) =>
    res.json()
  );

  // 将文章数据转换为路由参数格式
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

/**
 * 页面组件
 * 使用 ISR 策略：
 * 1. 首次访问时返回静态页面
 * 2. 后台定期重新生成新的静态页面
 * 3. 更新后的页面会在下次请求时提供给用户
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 解构获取路由参数中的 id
  const { id } = await params;

  // 获取特定文章的数据
  const post: Post = await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  );

  // 渲染文章内容
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
