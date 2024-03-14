'use server'

import { revalidatePath } from "next/cache";
import { createGuestbookEntry } from "./Handler"

export async function _action(data : FormData)
{
    const name = data.get("name") as string
    await createGuestbookEntry(name);
     revalidatePath("/")
}