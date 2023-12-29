import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class BankDefaultService extends GenericService<BankDefault> {
    protected apiUrl = `${environment.baseUrl}${environment.bankDefaultUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
