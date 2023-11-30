/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Base } from '@core/models/base.model'
import { Page } from '@core/models/page.model'
import { RestService } from '@core/services/rest.service'
import { EntityAttribute, TableData } from '@core/utility/types'
import { DialogDeleteComponent } from '@shared/components/dialog-delete/dialog-delete.component'
import { DialogFormComponent } from '@shared/components/dialog-form/dialog-form.component'
import { TableComponent } from '@shared/components/table/table.component'
import { EMPTY, Observable, catchError } from 'rxjs'

@Directive()
export abstract class BaseAdminPageComponent<T extends Base> {
    abstract title: string
    abstract name: string
    abstract attributes: EntityAttribute[]

    errorMessage: string | null = null
    service!: RestService<T>
    dialog!: MatDialog

    data$!: Observable<Page<T>>
    selected!: T
    tableData!: TableData

    @ViewChild(TableComponent) table!: TableComponent<T>

    findAttribute(key: string): EntityAttribute | undefined {
        return this.attributes.find(attribute => attribute.key === key)
    }

    getPage(data?: TableData) {
        this.errorMessage = null
        data === undefined ? (data = this.tableData) : (this.tableData = data)

        this.data$ = this.service.getPage(data?.request).pipe(
            catchError(error => {
                this.errorMessage = 'Erreur lors du chargement des données.'
                console.error(
                    'Erreur lors de la récupération des données:',
                    error
                )
                return EMPTY
            })
        )
    }

    getOptions(attributeKey: string, service: RestService<any>) {
        const attribute = this.findAttribute(attributeKey)
        if (!attribute) {
            return
        }

        service.getAll().subscribe(arr => {
            const options: any = {}
            arr.forEach(el => {
                const option: any = {}
                option['data'] = el
                if (attribute.display) {
                    option['display'] = attribute.display(el)
                }
                options[el.id] = option
            })
            attribute.options = options
        })
    }

    create() {
        this.openForm()
    }

    edit(value: T) {
        const newValue = { ...value }
        this.format(newValue)
        this.selected = newValue
        this.openForm(this.selected)
    }

    format(value: any) {
        this.attributes
            .filter(attribute => attribute.type === 'select')
            .forEach(attribute => {
                if (!value[attribute.key]) {
                    return
                }

                const formattedValue: any = {}
                formattedValue['data'] = value[attribute.key]
                if (attribute.display) {
                    formattedValue['display'] = attribute.display(
                        value[attribute.key]
                    )
                }
                value[attribute.key] = formattedValue
            })
    }

    openForm(value?: T) {
        const dialogRef = this.dialog.open(DialogFormComponent, {
            data: {
                name: this.name,
                attributes: this.attributes,
                value: value,
            },
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.process(result)
            }
        })
    }

    process(value: T) {
        delete value['ids']
        value.id
            ? this.service.update(value.id, value).subscribe({
                  next: () => {
                      this.getPage()
                  },
                  error: () => {
                      window.alert('Something went wrong! Please try again')
                  },
              })
            : this.service.create(value).subscribe({
                  next: () => {
                      this.getPage()
                  },
                  error: () => {
                      window.alert('Something went wrong! Please try again')
                  },
              })
    }

    delete(ids: number[]) {
        if (!ids.length) {
            window.alert('No rows are selected!')
            return
        }

        const dialogRef = this.dialog.open(DialogDeleteComponent)
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.deleteSelection(ids).subscribe(() => {
                    this.getPage()
                    this.table.clearSelection()
                })
            }
        })
    }
}
