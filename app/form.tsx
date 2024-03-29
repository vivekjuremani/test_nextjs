'use client'

import { useRef, useState, useTransition } from 'react'
import { createGuestbookEntry } from './lib/Handler'
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { _action } from './lib/_action';
const GuestbookEntryForm = () => {
  const formRef = useRef<HTMLFormElement> (null);
const [isPending,starttranstition] = useTransition()
const router = useRouter();
  // client action calling a server action
  async function action(data : FormData) {
       _action(data);
    // if (formRef.current) {
    //   formRef.current.reset()
    //   }
     
    //   starttranstition(()=>{ router.refresh()})
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