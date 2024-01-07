import { MediaText } from '@core/entity/evaluation/media-text.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { MediaTextActions } from './media-text.actions'
import { mediaTextAdapter } from './media-text.adapter'

export interface MediaTextState extends ExtendedState<MediaText> {
    relatedEntities: { [id: number]: { options?: number[] } }
}

export const initialState: MediaTextState = mediaTextAdapter.getInitialState({
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

export const mediaTextReducer = createGenericReducer<MediaText>(
    mediaTextAdapter,
    initialState,
    MediaTextActions,
    'mediaTexts'
)
