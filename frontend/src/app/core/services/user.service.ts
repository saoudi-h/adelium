import { Injectable } from '@angular/core'
import { User } from '@core/entity/user.entity'
import { environment } from 'src/environments/environment.development'
import { RestService } from './rest.service'

@Injectable({ providedIn: 'root' })
export class UserService extends RestService<User> {
    override url = `${environment.baseUrl}/api/v1/auth/users`
}
