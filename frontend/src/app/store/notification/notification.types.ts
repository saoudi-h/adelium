/**
 * Notice type
 */
export type NoticeType = 'success' | 'error' | 'info' | 'warning'

/**
 * Notice interface
 */
export interface Notice {
    id: string
    type: NoticeType
    title: string
    message: string
    datetime: Date
}
