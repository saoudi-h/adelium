import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { MediaBooleanActions } from './media-boolean.actions'
import { mediaBooleanAdapter } from './media-boolean.adapter'

export interface MediaBooleanState extends ExtendedState<MediaBoolean> {
    relatedEntities: { [id: number]: { options?: number[] } }
}

export const initialState: MediaBooleanState =
    mediaBooleanAdapter.getInitialState({
        paginationInfo: {
            params: {
                page: 0,
                size: 5,
                sort: [],
            },
            result: {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0,
            },
            pageIds: [],
        },
        relatedEntities: {},
        transactions: {},
        isLoading: false,
        error: null,
    })

export const mediaBooleanReducer = createGenericReducer<MediaBoolean>(
    mediaBooleanAdapter,
    initialState,
    MediaBooleanActions,
    'mediaBooleans'
)
