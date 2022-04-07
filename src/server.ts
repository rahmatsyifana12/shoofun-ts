import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import globalRouter from './routes';
import connectionConfig from './ormconfig';

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    app.use('/', globalRouter);
    await createConnection(connectionConfig);

    console.log(`Server is hosted at http://localhost:${port}/`);
});