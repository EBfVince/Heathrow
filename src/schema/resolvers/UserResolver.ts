import { Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../../context'
import { User } from '../model/User'

@Resolver()
export class UserResolver {
  @Mutation((returns) => User)
  async createUser(@Ctx() context: Context): Promise<User> {
    const firebaseUser = context.user
    if (firebaseUser === undefined) {
      throw new Error('You need to send the user in the header bro')
    }

    // Vérifie que le user n'exite pas déjà
    const userFromBd = await context.prisma.user.findUnique({
      where: { id: firebaseUser.uid },
    })
    if (userFromBd !== null) {
      throw new Error('You already exist')
    }

    // Enregistre le user en BD
    return context.prisma.user.create({
      data: {
        id: firebaseUser.uid,
        name: firebaseUser.name || '',
        email: firebaseUser.email || '',
      },
    })
  }

  @Authorized()
  @Query((returns) => User)
  async me(@Ctx() ctx: Context) {
    const firebaseUser = ctx.user
    if (firebaseUser === undefined) {
      throw new Error('You need to send the user in the header bro')
    }

    const user: User | null = await ctx.prisma.user.findUnique({
      where: { id: firebaseUser.uid },
    })

    if (user == null) {
      throw new Error('The user doesnt exist.')
    }

    return user
  }
}
