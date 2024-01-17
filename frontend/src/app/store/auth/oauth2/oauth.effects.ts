import { GithubOauthEffects } from './github/github-oauth.effects'
import { GoogleOauthEffects } from './google/google-oauth.effects'

export const OauthEffects = [GithubOauthEffects, GoogleOauthEffects]
