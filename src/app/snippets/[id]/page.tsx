import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { deleteSnippet } from '@/actions';

interface Props {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: Props) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: Number(props.params.id),
    },
  });

  if (!snippet) return notFound();

  const deleteSnippetAction = deleteSnippet.bind(null, { id: snippet.id });

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${props.params.id}/edit`}
            className="p-2 border rounded"
          >
            edit
          </Link>
          <form action={deleteSnippetAction}>
            <button type="submit" className="p-2 border rounded">
              delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// enable next.js to pre-render routes for all existing snippets in the database.
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
