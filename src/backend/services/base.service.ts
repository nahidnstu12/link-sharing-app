import connect from "@/backend/db";

export class BaseService {
  async initDB() {
    await connect();
  }
  async register() {
    await this.initDB();
  }
  createResponse(status: number, message: string, data?: any) {
    return { status, message, data };
  }
}

export async function resolveService<T extends BaseService>(
  service: new () => T
): Promise<T> {
  let serviceInstance = new service();
  await serviceInstance.register();
  return serviceInstance;
}
