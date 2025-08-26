import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma
}

export default prisma
