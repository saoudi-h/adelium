import { BankDefaultEffects } from './bank/bank-default/bank-default.effects'
import { MediaBooleanEffects } from './media/media-boolean/media-boolean.effects'
import { MediaTextEffects } from './media/media-text/media-text.effects'
import { OptionMcqEffects } from './option/question-mcq/option-mcq.effects'
import { OptionTrueFalseEffects } from './option/question-true-false/option-true-false.effects'
import { QuestionMcqEffects } from './question/question-mcq/question-mcq.effects'
import { QuestionTrueFalseEffects } from './question/question-true-false/question-true-false.effects'
import { QuizDefaultEffects } from './quiz/quiz-default/quiz-default.effects'
import { QuizMcqEffects } from './quiz/quiz-mcq/quiz-mcq.effects'
import { TagEffects } from './tag/tag.effects'

export const EvaluationEffects = [
    QuizDefaultEffects,
    QuizMcqEffects,
    BankDefaultEffects,
    TagEffects,
    QuestionMcqEffects,
    QuestionTrueFalseEffects,
    OptionTrueFalseEffects,
    OptionMcqEffects,
    MediaTextEffects,
    MediaBooleanEffects,
]
