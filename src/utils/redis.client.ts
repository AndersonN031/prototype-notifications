import { createClient } from 'redis';
import { Item } from 'src/items/item.entity';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', err => console.log('Redis Client Error', err));

redis.connect()
  .then(() => console.log('Redis conectado!'))
  .catch(console.error);

export async function saveToRedis(key: string, value: string) {
  await redis.set(key, value, { EX: 6000 });
}


export async function getFromRedis(key: string): Promise<string | null> {
  const result = await redis.get(key);
  if (!result || result === '[]' || result === '{}') return null;
  return result;
}

export async function deleteFromRedis(key: string): Promise<boolean> {
  const result = await redis.del(key);
  return result > 0;

}