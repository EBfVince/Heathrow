import { Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '../../context'
import { User } from '../model/User'

@Resolver()
export class UserResolver {
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
