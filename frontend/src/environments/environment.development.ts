export const environment = {
    production: false,
    baseUrl: 'http://localhost:8080',

    // Auth-service
    authServiceUrl: '/api/v1/auth',
    userEndPoint: '/api/v1/auth/users',
    roleEndPoint: '/api/v1/auth/roles',
    authorityEndPoint: '/api/v1/auth/authorities',
    maxRefreshAttempts: 3,

    // Oauth2

    // Github
    githubClientId: 'c04e061736a77e0dafc1',
    githubRedirectUrl: 'http://127.0.0.1:4200/auth/login/oauth2/code/github',
    githubLoginUrl: 'https://github.com/login/oauth/authorize',

    // Google
    googleClientId:
        '769174024079-etii8opes9fikau39j14iqv7c66f0td4.apps.googleusercontent.com',
    googleRedirectUrl: 'http://127.0.0.1:4200/login/oauth2/code/google',
    googleLoginUrl: '/oauth2/authorization/google',

    // Quiz-service
    quizServiceUrl: '/api/v1/quiz',
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
    // Media
    mediaTextUrl: '/api/v1/quiz/media-texts',
    mediaBooleanUrl: '/api/v1/quiz/media-booleans',

    // Media-service
    mediaServiceUrl: '/api/v1/media',
}
