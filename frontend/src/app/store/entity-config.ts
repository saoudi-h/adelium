/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const entityConfig: { [key: string]: { actions: any; relations: any } } =
    {
        users: {
            actions: UserActions,
            relations: {
                roles: { type: 'manyToMany', partialUrl: 'roles' },
            },
        },
        roles: {
            actions: RoleActions,
            relations: {
                roles: { type: 'manyToMany', partialUrl: 'users' },
            },
        },
        bankDefaults: {
            actions: BankDefaultActions,
            relations: {
                tags: { type: 'manyToMany', partialUrl: 'tags' },
            },
        },
        quizDefaults: {
            actions: QuizDefaultActions,
            relations: {
                tags: { type: 'manyToMany', partialUrl: 'tags' },
            },
        },
        quizMcq: {
            actions: QuizMcqActions,
            relations: {
                tags: { type: 'manyToMany', partialUrl: 'tags' },
            },
        },
        tags: {
            actions: TagActions,
            relations: {},
        },
        questionMcq: {
            actions: QuestionMcqActions,
            relations: {
                tags: { type: 'manyToMany', partialUrl: 'tags' },
                options: { type: 'oneToMany', partialUrl: 'options' },
            },
        },
        questionTrueFalse: {
            actions: QuestionTrueFalseActions,
            relations: {
                tags: { type: 'manyToMany', partialUrl: 'tags' },
                options: { type: 'oneToMany', partialUrl: 'options' },
            },
        },
        optionsMcq: {
            actions: OptionMcqActions,
            relations: {
                questionMcq: { type: 'manyToOne', partialUrl: 'question-mcqs' },
            },
        },
        optionsTrueFalse: {
            actions: OptionTrueFalseActions,
            relations: {
                questionTrueFalse: {
                    type: 'manyToOne',
                    partialUrl: 'question-true-falses',
                },
            },
        },
    }
