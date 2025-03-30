import Redis from "ioredis";

/**
 * 创建 Redis 客户端实例
 * 默认连接到本地 Redis 服务器 (localhost:6379)
 */
const redis = new Redis();

/**
 * 初始数据
 * 当 Redis 中没有数据时，使用这些数据初始化
 * 每条笔记包含：
 * - title: 标题
 * - content: 内容
 * - updateTime: 更新时间
 */
const initialData = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

/**
 * 获取所有笔记
 * 如果 Redis 中没有数据，则使用初始数据
 * @returns Promise<Record<string, string>> 所有笔记的哈希表
 */
export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

/**
 * 添加新笔记
 * @param data 笔记数据（JSON 字符串）
 * @returns Promise<string> 新笔记的 UUID
 */
export async function addNote(data: any) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

/**
 * 更新指定笔记
 * @param uuid 笔记的唯一标识符
 * @param data 更新的笔记数据（JSON 字符串）
 */
export async function updateNote(uuid: string, data: any) {
  await redis.hset("notes", [uuid], data);
}

/**
 * 获取指定笔记
 * @param uuid 笔记的唯一标识符
 * @returns Promise<object> 笔记数据对象
 */
export async function getNote(uuid: string) {
  return JSON.parse((await redis.hget("notes", uuid)) || "{}");
}

/**
 * 删除指定笔记
 * @param uuid 笔记的唯一标识符
 * @returns Promise<number> 删除的记录数
 */
export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid);
}

export default redis;
