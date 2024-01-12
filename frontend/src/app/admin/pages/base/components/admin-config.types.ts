export interface AdminConfig {
    title: string
    name: string
    plural: string
    masculin: boolean
    tableLabels?: {
        label: string
        sortable: boolean
        sortField: string
    }[]
    subtitle: string
    exportable?: boolean
}
