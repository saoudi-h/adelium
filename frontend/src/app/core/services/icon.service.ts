import { Injectable, Type } from '@angular/core'
import { AdminIconComponent } from '@shared/components/icons/admin-icon.component'
import { AnnouncementsIconComponent } from '@shared/components/icons/announcements-icon.component'
import { AssessmentIconComponent } from '@shared/components/icons/assessment-icon.component'
import { BankIconComponent } from '@shared/components/icons/bank-icon.component'
import { CategoriesIconComponent } from '@shared/components/icons/categories-icon.component'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { CoursesIconComponent } from '@shared/components/icons/courses-icon.component'
import { ErrorIconComponent } from '@shared/components/icons/error-icon.component'
import { GroupsIconComponent } from '@shared/components/icons/groups-icon.component'
import { InfoIconComponent } from '@shared/components/icons/info-icon.component'
import { LogoutIconComponent } from '@shared/components/icons/logout-icon.component'
import { ProfileIconComponent } from '@shared/components/icons/profile.component'
import { ReportsComponent } from '@shared/components/icons/reports-icon.component'
import { SettingsIconComponent } from '@shared/components/icons/settings-icon.component'
import { SuccessIconComponent } from '@shared/components/icons/success-icon.component'
import { TrainingManagementIconComponent } from '@shared/components/icons/training-management-icon.component'
import { UsersIconComponent } from '@shared/components/icons/users-icon.component'
import { WarningIconComponent } from '@shared/components/icons/warning-icon.component'

@Injectable({
    providedIn: 'root',
})
export class IconService {
    getIconComponent(iconName: string): Type<unknown> | null {
        switch (iconName) {
            case 'admin-icon':
                return AdminIconComponent
            case 'close-icon':
                return CloseIconComponent
            case 'logout-icon':
                return LogoutIconComponent
            case 'profile-icon':
                return ProfileIconComponent
            case 'settings-icon':
                return SettingsIconComponent
            case 'info-icon':
                return InfoIconComponent
            case 'warning-icon':
                return WarningIconComponent
            case 'error-icon':
                return ErrorIconComponent
            case 'success-icon':
                return SuccessIconComponent
            case 'users-icon':
                return UsersIconComponent
            case 'courses-icon':
                return CoursesIconComponent
            case 'categories-icon':
                return CategoriesIconComponent
            case 'groups-icon':
                return GroupsIconComponent
            case 'assessment-icon':
                return AssessmentIconComponent
            case 'bank-icon':
                return BankIconComponent
            case 'training-management-icon':
                return TrainingManagementIconComponent
            case 'reports-icon':
                return ReportsComponent
            case 'announcements-icon':
                return AnnouncementsIconComponent
            default:
                return null
        }
    }
}
