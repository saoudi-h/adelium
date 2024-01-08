/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Identifiable {
    id: number
    [key: string]: any
    toString(): string
}
