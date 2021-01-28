import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: any;
  injector: any;
}

export function createContext(req: Context, injector: Context) {
  return { ...req, injector, prisma };
}
