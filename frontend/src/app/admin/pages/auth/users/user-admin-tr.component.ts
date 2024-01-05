import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Role } from '@core/entity/auth/role.entity'
import { User } from '@core/entity/auth/user.entity'
import { SharedModule } from '@shared/shared.module'
import { Observable } from 'rxjs'
import { ActionEntityComponent } from '../../base/components/action-entity.component'
@Component({
    selector: '[user-admin-tr]',
    standalone: true,
    imports: [CommonModule, SharedModule, ActionEntityComponent],
    template: `
        <td class="h-px w-px whitespace-nowrap">
            <label>
                <input type="checkbox" class="checkbox" />
            </label>
        </td>
        <!-- tds -->

        <td>
            <div class="flex flex-wrap items-center gap-3">
                <div class="avatar">
                    <div class="mask mask-hexagon h-12 w-12">
                        <img
                            [src]="
                                entity['avatar']
                                    ? entity['avatar']
                                    : 'https://gravatar.com/avatar/205e460b479e2?d=wavatar'
                            "
                            alt="Avatar de l'utilisteur" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">
                        {{ entity.firstname + ' ' + entity.lastname }}
                    </div>

                    <div class="text-sm opacity-50">
                        {{ entity.username }}
                    </div>

                    <div class="text-sm opacity-50">
                        {{ entity.phone }}
                    </div>
                </div>
            </div>
        </td>
        <!-- Address -->
        <td>
            @if (entity.address) {
                <div class="flex flex-col">
                    <div>
                        {{
                            entity.address.streetNumber +
                                ' ' +
                                entity['address'].street
                        }}
                    </div>

                    @if (entity['address'].additionalInfo) {
                        <div>
                            {{ entity['address'].additionalInfo }}
                        </div>
                    }
                    <div>
                        {{
                            entity['address'].postalCode +
                                ' ' +
                                entity['address'].city
                        }}
                    </div>
                    <div>
                        {{ entity['address'].country }}
                    </div>
                </div>
            }
        </td>
        <!-- Autorisations -->
        <td>
            <div class="flex flex-col gap-1">
                @for (role of roles$ | async; track role) {
                    <span class="badge badge-outline badge-sm">
                        {{ role.name }}
                    </span>
                } @empty {
                    <span class=""> Aucun Role </span>
                }
            </div>
        </td>
        <!-- Status -->
        <td>
            <table class="table table-xs">
                <tbody>
                    <tr class="border-b-0">
                        <td class="text-right">Compte non expiré :</td>
                        <td>
                            {{
                                entity.accountNonExpired
                                    ? '&#x2705;'
                                    : '&#x274C;'
                            }}
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td class="text-right">Compte non verrouillé :</td>
                        <td>
                            {{
                                entity.accountNonLocked
                                    ? '&#x2705;'
                                    : '&#x274C;'
                            }}
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td class="text-right">Vérifié :</td>
                        <td>
                            {{ entity.verified ? '&#x2705;' : '&#x274C;' }}
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">Mot de passe non expiré:</td>
                        <td>
                            {{
                                entity.credentialsNonExpired
                                    ? '&#x2705;'
                                    : '&#x274C;'
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
        <!-- Securité-->
        <td>
            <table class="table table-xs">
                <tbody>
                    <tr class="border-b-0">
                        <td class="border-b-0 text-right">
                            Nombre de temptatives échoué :&nbsp;
                        </td>
                        <td>
                            {{ entity.failedLoginAttempts }}
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td class="text-right">Vérrouillé depuis :&nbsp;</td>
                        <td>
                            @if (entity.lockTime) {
                                {{ entity.lockTime | date }}
                            } @else {
                                Non vérrouillé
                            }
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td class="text-right">
                            Token de réinitialisation :&nbsp;
                        </td>
                        <td>
                            @if (entity.resetPasswordToken) {
                                {{ entity.resetPasswordToken }}
                            } @else {
                                Non défini
                            }
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td class="text-right">
                            Expiration du token de réinitialisation :&nbsp;
                        </td>
                        <td>
                            @if (entity.resetPasswordTokenExpiry) {
                                {{ entity.resetPasswordTokenExpiry | date }}
                            } @else {
                                Non défini
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
        <!-- Autres -->
        <td>
            <table class="table-zebra-zbra table table-xs">
                <tbody>
                    <tr class="border-b-0">
                        <td>Créer&nbsp;</td>
                        <td>
                            {{ entity.createdAt | dateDistance: true }}
                        </td>
                    </tr>
                    <tr class="border-b-0">
                        <td>Modifier&nbsp;</td>
                        <td>
                            <!-- date en francais  -->
                            {{ entity.updatedAt | dateDistance: true }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
        <!-- Actions -->
        <td
            class="text-right"
            action-entity
            [id]="entity.id"
            (delete)="onDelete($event)"
            (edit)="onEdit($event)"></td>
    `,
})
export class UserAdminTrComponent implements OnInit {
    @Input() entity!: User
    @Input() getRoles!: (id: number) => Observable<Role[]>
    roles$!: Observable<Role[]>
    @Output() delete = new EventEmitter<number>()
    @Output() edit = new EventEmitter<number>()

    onDelete(id: number) {
        this.delete.emit(id)
    }

    onEdit(id: number) {
        this.edit.emit(id)
    }
    ngOnInit(): void {
        this.roles$ = this.getRoles(this.entity.id)
    }
}
