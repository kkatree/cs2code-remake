import { PrismaClient } from '@prisma/client';

// PrismaClient'ın tek bir instance'ını oluşturmak için global değişken kullanımı
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 