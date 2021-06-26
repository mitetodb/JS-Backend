module.exports = {
    SERVER_PORT: 3000,
    DB_URI: 'mongodb://localhost:27017/cubicle',
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    AUTH_TOKEN_SECRET: 'my-very-secure-secret',
    AUTH_COOKIE_NAME: 'SESSION_DATA'
};