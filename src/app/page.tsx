import Link from 'next/link';
import { db } from '@/db';

export default async function Home() {
  const snippets = await db.snippet.findMany();
  return (
    <div>
      <div className="flex justify-between m-2 items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link className="underline text-blue-400" href="/snippets/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {snippets.map((snippet) => (
          <Link
            href={`/snippets/${snippet.id}`}
            key={snippet.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div>{snippet.title}</div>
            <div>view</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
