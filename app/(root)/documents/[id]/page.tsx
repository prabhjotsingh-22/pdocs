import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Document = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-dark-100">
      <div className="w-full max-w-[800px] flex-1 p-4">
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
    </div>
  )
}

export default Document