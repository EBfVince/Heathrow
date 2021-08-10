import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export const rules: AuthChecker<Context> = ({ context: { user } }) => {
  return user !== undefined
}
