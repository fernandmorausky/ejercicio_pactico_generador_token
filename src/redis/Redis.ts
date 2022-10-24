import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';
export default class Redis {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: process.env.URL_REDIS
    });
  };
  async setKey(key, value) {
    await this.client.connect()
    await this.client.set(key, value, { EX: 60 * 15 });
    await this.client.disconnect();
  };
  async getKey(key: string): Promise<string | null> {
    await this.client.connect()
    const data: string | null = await this.client.get(key);
    await this.client.disconnect();
    return data;
  };
}
