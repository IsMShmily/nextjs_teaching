import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   * experimental 配置项用于启用实验性功能
   * 这些功能可能在未来版本中成为稳定特性
   */
  experimental: {
    /**
     * staleTimes 配置用于控制数据缓存时间
     * 可以优化应用性能和用户体验
     */
    staleTimes: {
      /**
       * dynamic: 动态路由页面的缓存时间（秒）
       * 这里设置为 10 秒，意味着：
       * - 动态页面数据最多缓存 10 秒
       * - 10 秒后的请求会触发重新获取数据
       * - 适合数据更新较频繁的场景
       */
      dynamic: 10,

      /**
       * static: 静态页面的缓存时间（秒）
       * 这里设置为 180 秒（3分钟），意味着：
       * - 静态页面最多缓存 3 分钟
       * - 3 分钟后的请求会触发重新生成
       * - 适合内容相对稳定的页面
       */
      static: 180,
    },
  },
};

export default nextConfig;
