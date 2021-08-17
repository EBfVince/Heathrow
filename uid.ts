import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string)
initializeApp(firebaseConfig)
const auth = getAuth()
connectAuthEmulator(auth, 'http://localhost:9099')

// Voir pour utiliser http://vorpal.js.org/

async function main(): Promise<void> {
  const { user } = await signInWithEmailAndPassword(
    auth,
    'user@user.com',
    'password',
  )
  const userToken = (await user.getIdToken()) || 'erreur'
  console.log(`
{
  "authorization": "Bearer ${userToken}"
}
`)
}

main()
