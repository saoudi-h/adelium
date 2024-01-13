import { GithubOauthActions } from './github/github-oauth.actions'
import { GithubOauthSelectors } from './github/github-oauth.selectors'

export const providersMap = {
    github: {
        actions: GithubOauthActions,
        selectors: GithubOauthSelectors,
    },
}
