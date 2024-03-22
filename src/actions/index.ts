'use server';
import { db } from '@/db';
import { type Snippet } from '@prisma/client';

export async function updateSnippet({
  code,
  id,
}: Pick<Snippet, 'id' | 'code'>) {
  await db.snippet.update({
    where: {
      id: Number(id),
    },
    data: {
      code: code,
    },
  });
}
