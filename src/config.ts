import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const config = {
    db: {
        host: env.DB_HOST!,
        database: env.DB_DATABASE!,
        username: env.DB_USERNAME!,
        password: env.DB_PASSWORD!
    }
};

export default config;