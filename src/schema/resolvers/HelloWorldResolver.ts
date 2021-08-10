import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
  @Query()
  hello(@Arg('name', { defaultValue: 'Vince' }) nom: string): string {
    return 'Hello ' + nom
  }
}
