import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';

createConnection()
    .then(() => {
        const port = process.env.PORT || 5000;

        app.listen(port, () =>
            console.log(`Server is hosted at http://localhost:${port}/`));
    })
    .catch((err) => console.error(err));