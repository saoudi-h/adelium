import { Injectable, Type } from '@angular/core'
import { AddIconComponent } from '@shared/components/icons/add-icon.component'
import { AdminIconComponent } from '@shared/components/icons/admin-icon.component'
import { AnnouncementsIconComponent } from '@shared/components/icons/announcements-icon.component'
import { AssessmentIconComponent } from '@shared/components/icons/assessment-icon.component'
import { AuthIconComponent } from '@shared/components/icons/auth-icon.component'
import { AuthorityIconComponent } from '@shared/components/icons/authority-icon.component'
import { BankIconComponent } from '@shared/components/icons/bank-icon.component'
import { CategoriesIconComponent } from '@shared/components/icons/categories-icon.component'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { CoursesIconComponent } from '@shared/components/icons/courses-icon.component'
import { DeleteIconComponent } from '@shared/components/icons/delete-icon.component'
import { EditIconComponent } from '@shared/components/icons/edit-icon.component'
import { ErrorIconComponent } from '@shared/components/icons/error-icon.component'
import { ExportIconComponent } from '@shared/components/icons/export-icon.component'
import { GroupsIconComponent } from '@shared/components/icons/groups-icon.component'
import { HomeIconComponent } from '@shared/components/icons/home-icon.component'
import { InfoIconComponent } from '@shared/components/icons/info-icon.component'
import { LoginIconComponent } from '@shared/components/icons/login-icon.component'
import { LogoutIconComponent } from '@shared/components/icons/logout-icon.component'
import { NotFoundIconComponent } from '@shared/components/icons/not-found-icon.component'
import { OptionIconComponent } from '@shared/components/icons/option-icon.component'
import { ProfileIconComponent } from '@shared/components/icons/profile.component'
import { QuestionIconComponent } from '@shared/components/icons/question-icon.component'
import { QuizIconComponent } from '@shared/components/icons/quiz-icon.component'
import { RegisterIconComponent } from '@shared/components/icons/register-icon.component'
import { ReportsComponent } from '@shared/components/icons/reports-icon.component'
import { RoleIconComponent } from '@shared/components/icons/role-icon.component'
import { SaveIconComponent } from '@shared/components/icons/save-icon.component'
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
            case 'home-icon':
                return HomeIconComponent
            case 'login-icon':
                return LoginIconComponent
            case 'register-icon':
                return RegisterIconComponent
            case 'not-found-icon':
                return NotFoundIconComponent
            case 'save-icon':
                return SaveIconComponent
            case 'role-icon':
                return RoleIconComponent
            case 'auth-icon':
                return AuthIconComponent
            case 'authority-icon':
                return AuthorityIconComponent
            case 'add-icon':
                return AddIconComponent
            case 'edit-icon':
                return EditIconComponent
            case 'delete-icon':
                return DeleteIconComponent
            case 'export-icon':
                return ExportIconComponent
            case 'question-icon':
                return QuestionIconComponent
            case 'option-icon':
                return OptionIconComponent
            case 'quiz-icon':
                return QuizIconComponent
            default:
                return null
        }
    }
}
