import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivities } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // get activities
  const activity = await getActivities(userInfo._id);
  /**
   * -------------------
   * ------- JSX -------
   * -------------------
   */
  return (
    <section>
      <h1 className="text-white">Activity Page</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Pofile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
