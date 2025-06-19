import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DEFAULT_AVATAR = "/assets/icons/user.svg";

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if(!clerkUser) redirect('/sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Use a default avatar if imageUrl is missing or not a valid image
  let avatar = imageUrl;
  if (!avatar || typeof avatar !== 'string' || avatar.endsWith('.pdf') || avatar.endsWith('.docx')) {
    avatar = DEFAULT_AVATAR;
  }

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar,
      color: getUserColor(id),
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}