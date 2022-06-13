// Packages:
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {
  get,
  ref,
  set,
  increment
} from 'firebase/database'
import date from 'date-and-time'
import ordinal from 'date-and-time/plugin/ordinal'
date.plugin(ordinal)


// Typescript:
import { IPreviewEntry, IUser } from '../ts/state'


// Constants:
import { DATABASE } from './'


// Exports:
export const DEFAULT_FIRESTORE_USER = {
  entries: 0,
  lastSeen: Timestamp.now()
}

export const updateFirestoreUser = async (newUser?: Partial<IUser>) => {
  const auth = getAuth()
  if (
    !auth.currentUser ||
    !auth.currentUser.uid ||
    !auth.currentUser.displayName ||
    !auth.currentUser.email
  ) return
  const userRef = doc(DATABASE.FIRESTORE, 'users', auth.currentUser.uid)
  if (!(await getDoc(userRef)).exists()) {
    setDoc(userRef, {
      ...DEFAULT_FIRESTORE_USER,
      username: auth.currentUser.displayName,
      email: auth.currentUser.email,
      ...newUser
    })
    await set(ref(DATABASE.REALTIME, `users/${ auth.currentUser.displayName }`), true)
  } else updateDoc(userRef, newUser)
}

export const getUserDiary = async (props?: {
  limit?: number
}) => {
  const auth = getAuth()
  if (!auth.currentUser || !auth.currentUser.uid) return []
  const userEntriesRef = collection(DATABASE.FIRESTORE, 'users', auth.currentUser.uid, 'entries')
  const q = query(userEntriesRef, orderBy('time', 'desc'), limit(props?.limit ?? 10))
  const querySnapshot = await getDocs(q)
  const entries: IPreviewEntry[] = []
  querySnapshot.forEach(entry => {
    entries.push(entry.data() as IPreviewEntry)
  })
  return entries
}

export const firestoreTimeToReadable = (seconds?: number) => {
  return date.format(
    new Date(
      (
        (
          seconds ?? (Date.now() / 1000)
        ) * 1000
      )
      ??
      Date.now()
    ),
    'h:m A, DDD MMM YYYY'
  )
}

export const isUsernameTaken = async (username: string) => (await get(ref(DATABASE.REALTIME, `users/${ username }`))).exists()

export const handleEntryRead = async (entryID: string, localEntriesRead: string[]) => {
  if (localEntriesRead.includes(entryID)) return
  await set(ref(DATABASE.REALTIME, `entries/${ entryID }/views`), increment(1))
}
