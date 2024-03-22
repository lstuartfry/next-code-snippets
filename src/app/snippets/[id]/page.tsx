import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';

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
          <button className="p-2 border rounded">delete</button>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
