export const environment = {
    production: false,
    baseUrl: 'http://localhost:8080',
    userEndPoint: '/api/v1/auth/users',
    roleEndPoint: '/api/v1/auth/roles',
    authorityEndPoint: '/api/v1/auth/authorities',
    maxRefreshAttempts: 3,

    // Quiz
    quizDefaultUrl: '/api/v1/quiz/quiz-defaults',
    quizMcqUrl: '/api/v1/quiz/quiz-mcqs',
    // Bank
    bankDefaultUrl: '/api/v1/quiz/bank-defaults',
}
