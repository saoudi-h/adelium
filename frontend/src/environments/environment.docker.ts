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
    githubClientId: 'b2ef4501d235c2f8e460',
    githubRedirectUrl: 'http://localhost/auth/login/oauth2/code/github',
    githubLoginUrl: 'https://github.com/login/oauth/authorize',
    githubScope: 'user',

    // Google
    googleClientId:
        '769174024079-qsbnv70itdoho3c4fc8at8hu4oog8nc2.apps.googleusercontent.com',
    googleRedirectUrl: 'http://localhost/auth/login/oauth2/code/google',
    googleLoginUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    googleScope:
        'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
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
