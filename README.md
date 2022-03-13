# About
This is one of the standard template used for creating **Backend** applications.

### Dependencies
1. [express](https://www.npmjs.com/package/express) <br>
   * Node.js backend framework.
   * `body-parser` is already built-in to this package (ex: `express.json()`).
2. [cors](https://www.npmjs.com/package/cors) <br>
   * Express middleware used to enable CORS (Cross-origin resource sharing).
   * TLDR: Allows the frontend guys to access the backend.
3. [http-status-codes](https://www.npmjs.com/package/http-status-codes) <br>
   * To avoid _magic numbers_ and use constants enum, ex: using `BAD_REQUEST` instead of `400`.
4. [joi](https://www.npmjs.com/package/joi) <br>
   * JSON validation library.
   * Making it easy to make sure all (or certain) properties exists and valid.
5. [luxon](https://www.npmjs.com/package/luxon) <br>
   * TLDR: Library that provides better date and time than default `Date` from JS.
   * Why not `momentjs`? It has stopped it's development, [check here](https://momentjs.com/docs/#/-project-status/).
6. [pg](https://www.npmjs.com/package/pg) <br>
   * PostgreSQL database library for Node.js.
   * We use PostgreSQL as our main DBMS.
7. [typeorm](https://www.npmjs.com/package/typeorm) <br>
   * ORM (Object-relational mapping) library for Node.js.
   * Helps us to access the database without a need to write SQL queries.
     * It can prevent typos in SQL query.
     * It can make cleaner codes, thus more readable.
     * It's perfect for TypeScript users.
8. [bcrypt](https://www.npmjs.com/package/bcrypt) <br>
   * To hash password, add salt to it, and also verify the hashed passwords easily.
   * It's a bad practice to store passwords in plain-text, [this forum explains why it's bad](https://security.stackexchange.com/q/120540).
9.  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) <br>
    * For user authentication, like so we can tell whether a user is logged-in or not.
    * There are other methods like _Cookies_ and _Sessions_, [but this is more secure](https://stackoverflow.com/a/38855050).

# Usage
1. Clone the template using git.
   ```sh
   https://github.com/BNCC-Bandung/project-template.git -b backend
   ```
2. Remove the `.git` folder after you've cloned to disconnect from the this repo.
3. Install the packages using [yarn](https://classic.yarnpkg.com/lang/en/).
   ```sh
   yarn install
   ```
4. Edit the `package.json` and fill the fields you think are important. At least the `name`, `version`, and `author`. The `description` field is okay to be filled and can help for short understanding.