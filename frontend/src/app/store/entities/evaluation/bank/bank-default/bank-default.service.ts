import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class BankDefaultService extends GenericService<BankDefault> {
    protected apiUrl = `${environment.baseUrl}${environment.bankDefaultUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
