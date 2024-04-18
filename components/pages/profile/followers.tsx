import Link from "next/link";
import { getFollowersCountByUsername, getFollowingsCountByUsername } from "@/services/follow";

import { Button } from "@/components/ui/button";

export default async function Followers({
  username,
}: {
  username: string;
}) {
  const followersCount = await getFollowersCountByUsername(username);
  const followingsCount = await getFollowingsCountByUsername(username);

  return (
    <>
      <Link href={`/followers/${username}`} className="flex-1">
        <Button tabIndex={-1} variant="outline" className="w-full">
          Followers {followersCount}
        </Button>
      </Link>

      <Link href={`/followings/${username}`} className="flex-1">
        <Button tabIndex={-1} variant="outline" className="w-full">
          Followings {followingsCount}
        </Button>
      </Link>
    </>
  );
}