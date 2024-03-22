import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippedEditForm from '@/components/SnippetEditForm';

interface Props {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: Props) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: Number(props.params.id),
    },
  });
  if (!snippet) notFound();
  return (
    <div>
      <SnippedEditForm snippet={snippet} />
    </div>
  );
}
