import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '@core/entity/auth/user.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class UserService extends GenericService<User> {
    protected apiUrl = `${environment.baseUrl}${environment.userEndPoint}`
    protected serviceUrl = `${environment.baseUrl}${environment.authServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
