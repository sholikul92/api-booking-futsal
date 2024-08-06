import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllFields = async () => {
  const fields = prisma.fields.findMany();

  return fields;
};