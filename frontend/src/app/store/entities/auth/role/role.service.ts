import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Role } from '@core/entity/auth/role.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class RoleService extends GenericService<Role> {
    protected apiUrl = `${environment.baseUrl}${environment.roleEndPoint}`
    protected serviceUrl = `${environment.baseUrl}${environment.authServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
