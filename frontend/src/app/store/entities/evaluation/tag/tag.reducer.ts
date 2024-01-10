import { Tag } from '@core/entity/evaluation/tag.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { TagActions } from './tag.actions'
import { tagAdapter } from './tag.adapter'

export interface TagState extends ExtendedState<Tag> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: TagState = tagAdapter.getInitialState({
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
    relatedEntity: {},
    transactions: {},
    isLoading: false,
    error: null,
})

export const tagReducer = createGenericReducer<Tag>(
    tagAdapter,
    initialState,
    TagActions,
    'tags'
)
