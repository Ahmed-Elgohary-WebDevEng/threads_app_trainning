import { fetchThreads } from "@/lib/actions/thread.actions";
import { Fragment } from "react";
import ThreadCard from "@/components/cards/thread-card";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <Fragment>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className={"no-result"}>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              //   Thread Card Component
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                isComment={true}
              />
            ))}
          </>
        )}
      </section>
    </Fragment>
  );
}
