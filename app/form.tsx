'use client'

import { useRef, useState } from 'react'
import { createGuestbookEntry } from './lib/Handler'
import { revalidatePath } from 'next/cache';
const GuestbookEntryForm = () => {
  const formRef = useRef<HTMLFormElement> (null);


  // client action calling a server action
  async function action(data : FormData) {
    let name=data.get("name") as string
    const result = await createGuestbookEntry(name)
    if (formRef.current) {
      formRef.current.reset()
      }
     
    }

  return (
    <form
      ref={formRef}
      className='flex max-w-sm flex-col gap-y-3 text-sm'
      action={action}
    >
      <input
        type='text'
        name='name'
        placeholder='Your name'
        className='rounded border bg-transparent px-3 py-1 dark:border-gray-600'
      />
     
      <button
        type='submit'
        className='rounded bg-black px-3 py-1 text-white disabled:opacity-50 dark:bg-white dark:text-black'
      >
        Add
      </button>
    </form>
  )
}

export default GuestbookEntryForm