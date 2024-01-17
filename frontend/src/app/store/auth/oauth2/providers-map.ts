import { GithubOauthActions } from './github/github-oauth.actions'
import { GithubOauthSelectors } from './github/github-oauth.selectors'
import { GoogleOauthActions } from './google/google-oauth.actions'
import { GoogleOauthSelectors } from './google/google-oauth.selectors'

export const providersMap = {
    github: {
        receiveToken: false,
        actions: GithubOauthActions,
        selectors: GithubOauthSelectors,
    },
    google: {
        receiveToken: true,
        actions: GoogleOauthActions,
        selectors: GoogleOauthSelectors,
    },
}
