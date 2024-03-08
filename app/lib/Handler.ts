'use server'
import { cache } from 'react'
import clientPromise from './utilis'
import { Collection, Db, ListDatabasesOptions, MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'
import { revalidatePath } from 'next/cache'

let client : MongoClient
let db :  Db;
let guestbook : Collection; 


async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    guestbook = await db.collection('guestbook')
  } catch (error) {
    throw new Error('Failed to connect to the database.')
  }
}

(async () => {
  await init()
})();

/////////////////
/// Guestbook ///
////////////////
  type list={ name :string , _id : string};
export const getGuestbookEntries =(async () => {
  try {
    if (!guestbook) await init()

    const entries  = (await guestbook
      .find()
      .map(entry => ({ ...entry, _id: entry._id.toString() }))
      .toArray()) as list[] ;
    return { entries }
  } catch (error) {
    return { error: 'Failed to fetch guestbook!' }
  }

})

export const createGuestbookEntry = async (name: string) => {
  try {
    if (!guestbook) await init()

    return await guestbook.insertOne({ name })
  } catch (error) {
    return { error: 'Failed to create entry!' }
  }
}