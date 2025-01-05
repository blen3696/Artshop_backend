## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## To seed the admin user, run the following command:

```bash
$ npm run build
$ node dist/seeder/run-seeder.js

```

Then make sure the admin user is created in the database.

### For accessing the api's you can navigate to /api and see the api's.

......
sample order create schema
{
"fullName": "John Doe",
"phone": "123456789",
"address": "123 Main St",
"items": [
{ "artId": 1, "quantity": 20 },
{ "artId": 3, "quantity": 1 }
]
}
