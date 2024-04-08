'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { type Snippet } from '@prisma/client';

/**
 * A server action to create a new snippet.
 * Redirects to the homepage on a successful response.
 */
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // // validate the user input values
    const title = formData.get('title');
    const code = formData.get('code');

    // validate the title
    if (typeof title !== 'string' || title.length < 3) {
      return { message: 'Title must be longer' };
    }

    // validate the code
    if (typeof code !== 'string' || code.length < 10) {
      return { message: 'Code snippet must be longer' };
    }

    // create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      {
        return {
          message: error.message,
        };
      }
    } else {
      return {
        message: 'error creating snippet!',
      };
    }
  }
  // on success, revalidate and redirect to the homepage
  revalidatePath('/');
  redirect('/');
}

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
  // on success, revalidate and redirect to snippet view page
  revalidatePath(`/snippets/${id}`);
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
  // on success, revalidate and redirect to the homepage
  revalidatePath('/');
  redirect('/');
}
