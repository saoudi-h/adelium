import { combineReducers } from '@ngrx/store'
import {
    GithubOauthState,
    githubInitialState,
    githubOauthReducer,
} from './github/github-oauth.reducer'

export interface OauthRootState {
    github: GithubOauthState
}

export const initialOAuthRootState: OauthRootState = {
    github: githubInitialState,
}

export const oauthRootReducer = combineReducers({
    github: githubOauthReducer,
})
