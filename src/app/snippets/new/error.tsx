'use client';

interface Props {
  error: Error;
  reset: () => void;
}

export default function CreateSnippetErrorPage({ error }: Props) {
  return <div>{error.message}</div>;
}
