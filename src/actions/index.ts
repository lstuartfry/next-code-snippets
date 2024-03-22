'use server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { type Snippet } from '@prisma/client';

/**
 * Updates a single snippet's 'code' property.
 * Redirects the user back to the snippet View page after the update is successful.
 */
export async function updateSnippet({
  code,
  id,
}: Pick<Snippet, 'id' | 'code'>) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

/**
 * Deletes a single snippet.
 * Redirects the user back to the home page after the snippet is successfully deleted.
 */
export async function deleteSnippet({ id }: Pick<Snippet, 'id'>) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  redirect('/');
}
