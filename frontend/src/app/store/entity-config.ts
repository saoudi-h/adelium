/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from 'src/environments/environment.development'
import { RoleActions } from './entities/auth/role/role.actions'
import { UserActions } from './entities/auth/user/user.actions'
import { BankDefaultActions } from './entities/evaluation/bank/bank-default/bank-default.actions'
import { OptionMcqActions } from './entities/evaluation/option/question-mcq/option-mcq.actions'
import { OptionTrueFalseActions } from './entities/evaluation/option/question-true-false/option-true-false.actions'
import { QuestionMcqActions } from './entities/evaluation/question/question-mcq/question-mcq.actions'
import { QuestionTrueFalseActions } from './entities/evaluation/question/question-true-false/question-true-false.actions'
import { QuizDefaultActions } from './entities/evaluation/quiz/quiz-default/quiz-default.actions'
import { QuizMcqActions } from './entities/evaluation/quiz/quiz-mcq/quiz-mcq.actions'
import { TagActions } from './entities/evaluation/tag/tag.actions'

export const entityConfig: {
    [key: string]: { actions: any; relations: any; uri?: string }
} = {
    users: {
        actions: UserActions,
        relations: {
            roles: { type: 'manyToMany', partialUrl: 'roles', name: 'roles' },
        },
        uri: environment.userEndPoint,
    },
    roles: {
        actions: RoleActions,
        relations: {
            roles: { type: 'manyToMany', partialUrl: 'users', name: 'users' },
        },
        uri: environment.roleEndPoint,
    },
    bankDefaults: {
        actions: BankDefaultActions,
        relations: {
            tags: { type: 'manyToMany', partialUrl: 'tags', name: 'tags' },
        },
        uri: environment.bankDefaultUrl,
    },
    quizDefaults: {
        actions: QuizDefaultActions,
        relations: {
            tags: { type: 'manyToMany', partialUrl: 'tags', name: 'tags' },
        },
        uri: environment.quizDefaultUrl,
    },
    quizMcq: {
        actions: QuizMcqActions,
        relations: {
            tags: { type: 'manyToMany', partialUrl: 'tags', name: 'tags' },
        },
        uri: environment.quizMcqUrl,
    },
    tags: {
        actions: TagActions,
        relations: {},
        uri: environment.tagUrl,
    },
    questionMcqs: {
        actions: QuestionMcqActions,
        relations: {
            tags: { type: 'manyToMany', partialUrl: 'tags', name: 'tags' },
            options: {
                type: 'oneToMany',
                partialUrl: 'options',
                name: 'optionMcqs',
            },
        },
        uri: environment.questionMcqUrl,
    },
    questionTrueFalses: {
        actions: QuestionTrueFalseActions,
        relations: {
            tags: { type: 'oneToMany', partialUrl: 'tags', name: 'tags' },
            options: {
                type: 'oneToMany',
                partialUrl: 'options',
                name: 'optionTrueFalses',
            },
        },
        uri: environment.questionTrueFalseUrl,
    },
    optionMcqs: {
        actions: OptionMcqActions,
        relations: {
            questionMcqs: {
                type: 'manyToOne',
                partialUrl: 'question',
                name: 'questionMcqs',
            },
        },
        uri: environment.optionMcqUrl,
    },
    optionTrueFalses: {
        actions: OptionTrueFalseActions,
        relations: {
            question: {
                type: 'manyToOne',
                partialUrl: 'question',
                name: 'questionTrueFalses',
            },
        },
        uri: environment.optionTrueFalseUrl,
    },
}
