'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react';
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className='collaborative-room'>
          <Header>
          <p>Share</p>
          <SignedOut>
              <SignInButton />
              {/* <SignUpButton /> */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Header>
        <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollaborativeRoom