import React from "react";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = ({
  currentUserId,
  accountType,
  accountId,
}: ThreadsTabProps) => {
  return (
    <div>
      <h3 className={"text-white"}>Threads Tab</h3>
    </div>
  );
};

export default ThreadsTab;
