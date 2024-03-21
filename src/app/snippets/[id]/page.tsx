import { notFound } from 'next/navigation';
import { db } from '@/db';

type Props = {
  params: {
    id: string;
  };
};

export default async function SnippetShowPage(props: Props) {
  const id = Number(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: {
      id: id,
    },
  });

  if (!snippet) return notFound();

  return <div>{snippet.title}</div>;
}
