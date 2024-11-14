import type { MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const promise = new Promise<{ result: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ result: true });
    }, 5_500);
  });

  return {
    sync: { data: true },
    async: promise,
  };
}

export default function Index() {
  const { async } = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <Suspense fallback={<div>Loading</div>}>
          <Await resolve={async}>{() => <div>OK</div>}</Await>
        </Suspense>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">Error</div>
    </div>
  );
}
