import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const config = {
    db: {
        host: env.DB_HOST!,
        database: env.DB_DATABASE!,
        username: env.DB_USERNAME!,
        password: env.DB_PASSWORD!
    },
    jwt: {
        accessSecret: env.JWT_ACCESS_SECRET,
        refreshSecret: env.JWT_REFRESH_SECRET,

        accessExpire: '15m',
        refreshExpire: '30d'
    },
    saltRounds: 10
};

export default config;