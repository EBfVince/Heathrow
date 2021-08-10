import { PrismaClient } from '@prisma/client'
import * as admin from 'firebase-admin'

export interface FirebaseUser {
  uid: string
  email?: string
  name?: string
}

export interface Context {
  prisma: PrismaClient
  user?: FirebaseUser
}

export const prisma = new PrismaClient({ log: ['error', 'warn'] })

// Initialise Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string),
  ),
})

export async function createContext(ctx: any): Promise<Context> {
  // Ici on récupère l'idToken envoyé par le client pour l'authentifier
  // S'il n'y a rien, c'est pas grave
  let user: FirebaseUser | undefined = undefined
  if (ctx.req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = ctx.req.headers.authorization.split('Bearer ')[1]
    try {
      // Vérification faite par Firebase
      // https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
      user = await admin.auth().verifyIdToken(idToken)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    prisma: prisma,
    user: user,
  }
}
