'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import {liveblocks} from "../liveblocks";

const DEFAULT_AVATAR = "/assets/icons/user.svg";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user: any) => {
      let avatar = user.imageUrl;
      if (!avatar || typeof avatar !== 'string' || avatar.endsWith('.pdf') || avatar.endsWith('.docx')) {
        avatar = DEFAULT_AVATAR;
      }
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        avatar,
      };
    });

    const sortedUsers = userIds.map((email) =>
      users.find((user: any) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const getDocumentUsers = async ({roomId, currentUser, text}: {roomId: string, currentUser: string, text: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    if(text.length > 0) {
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email) => email.toLowerCase().includes(lowerCaseText));
      return parseStringify(filteredUsers);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}