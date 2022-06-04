// Packages:
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'


// Constants:
const firebaseConfig = {
  apiKey: 'AIzaSyAJZmZoXiUCqwCZOJPuC_TlgPJorG1jgAk',
  authDomain: 'unbottle-app.firebaseapp.com',
  projectId: 'unbottle-app',
  storageBucket: 'unbottle-app.appspot.com',
  messagingSenderId: '201256536670',
  appId: '1:201256536670:web:2377794a183abf30f0c2cf',
  measurementId: 'G-HESKHQ39E7'
}

const app = initializeApp(firebaseConfig)

const AUTH = getAuth(app)
const REALTIME = getDatabase(app)
const FIRESTORE = getFirestore(app)
const DATABASE = {
  REALTIME,
  FIRESTORE
}
const ANALYTICS = getAnalytics(app)


// Exports:
export {
  AUTH,
  DATABASE,
  ANALYTICS
}