export const environment = {
    production: false,
    baseUrl: 'http://localhost:8080',

    // Auth-service
    userEndPoint: '/api/v1/auth/users',
    roleEndPoint: '/api/v1/auth/roles',
    authorityEndPoint: '/api/v1/auth/authorities',
    maxRefreshAttempts: 3,

    // Quiz-service
    quizDefaultUrl: '/api/v1/quiz/quiz-defaults',
    quizMcqUrl: '/api/v1/quiz/quiz-mcqs',
    // Bank
    bankDefaultUrl: '/api/v1/quiz/bank-defaults',
    // Tag
    tagUrl: '/api/v1/quiz/tags',
    // Question
    questionMcqUrl: '/api/v1/quiz/question-mcqs',
    questionTrueFalseUrl: '/api/v1/quiz/question-true-falses',
    // Option
    optionMcqUrl: '/api/v1/quiz/option-mcqs',
    optionTrueFalseUrl: '/api/v1/quiz/option-true-falses',

    // Media-service
    mediaUrl: '/api/v1/media',
}
