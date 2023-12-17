/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Identifiable {
    id: number
    isDeleting?: boolean
    [key: string]: any
    toString(): string
}
