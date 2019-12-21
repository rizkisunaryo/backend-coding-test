[![codecov](https://codecov.io/gh/rizkisunaryo/backend-coding-test/branch/master/graph/badge.svg)](https://codecov.io/gh/rizkisunaryo/backend-coding-test)
[![CircleCI](https://circleci.com/gh/rizkisunaryo/backend-coding-test.svg?style=svg)](https://circleci.com/gh/rizkisunaryo/backend-coding-test)
![TypeScript](https://camo.githubusercontent.com/21132e0838961fbecb75077042aa9b15bc0bf6f9/68747470733a2f2f62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)

# Goal

This project is to track rides of every driver.

# How to

## Install
- Make sure that Node version 10 is installed and used by following [this instruction](#change-node-version).
- `yarn install`

## Run

### Development
`yarn dev`

### Production
`yarn start`

## Test

### Unit Test
`yarn test`

### Performance Test
`yarn test:load`

### Race Condition Test
`yarn test:race`

## Generate API Documentation
- We use `apidoc`. So, firstly please read about how to add documentation in https://apidocjs.com/#getting-started
- Then, run `yarn api-doc`
- The documentation will be generated inside `/doc` folder

# API Documentation
API documentation is available in https://rizkisunaryo.github.io/backend-coding-test/

# Folder Structure

## Code Folders
All codes are put inside `/src` folder. Why? It's easier to perform lint and test.
- `app.js` as starting point
- `helpers` contains helper files
- `inits` contains the things that we want to do initially / firstly
- `routes` contains the routes, e.g.: /health, /rides
- `singletons` contains singleton files, such as: database, logger, etc
- `validators` contains validators of the routes

## Test Folders
Inside Code Folders, there are some Test Folders:
- `__tests__` contains unit tests
- `__raceTests__` contains tests to simulate race condition

# Security

## SQL Injection
When writing SQL, avoid putting parameters inside it. Instead, use `?` and add parameters.
- Bad
```js
const sql = `SELECT * FROM Rides WHERE rideID='${id}'`
const [rows] = await DatabaseHelper.all(sql)
```
- Good
```js
const sql = `SELECT * FROM Rides WHERE rideID=?`
const [rows] = await DatabaseHelper.all(sql, id)
```

# Tests
## Unit Test Code Coverage
[![codecov](https://codecov.io/gh/rizkisunaryo/backend-coding-test/branch/master/graph/badge.svg)](https://codecov.io/gh/rizkisunaryo/backend-coding-test)

## Performance Test
After running `yarn test:load`, below is the result:
```
Started phase 0, duration: 30s @ 04:00:42(+0700) 2019-12-21
Report @ 04:00:52(+0700) 2019-12-21
Elapsed time: 10 seconds
  Scenarios launched:  33
  Scenarios completed: 33
  Requests completed:  1155
  RPS sent: 119.44
  Request latency:
    min: 0.7
    max: 5.4
    median: 0.9
    p95: 2.1
    p99: 3
  Codes:
    410: 1155

Report @ 04:01:02(+0700) 2019-12-21
Elapsed time: 20 seconds
  Scenarios launched:  33
  Scenarios completed: 33
  Requests completed:  1155
  RPS sent: 117.74
  Request latency:
    min: 0.6
    max: 4.4
    median: 0.8
    p95: 1.8
    p99: 2.5
  Codes:
    410: 1155

Report @ 04:01:12(+0700) 2019-12-21
Elapsed time: 30 seconds
  Scenarios launched:  34
  Scenarios completed: 33
  Requests completed:  1156
  RPS sent: 116.65
  Request latency:
    min: 0.6
    max: 4.1
    median: 0.7
    p95: 1.8
    p99: 3
  Codes:
    410: 1156

Report @ 04:01:13(+0700) 2019-12-21
Elapsed time: 30 seconds
  Scenarios launched:  0
  Scenarios completed: 1
  Requests completed:  34
  RPS sent: 69.39
  Request latency:
    min: 0.6
    max: 3.2
    median: 0.9
    p95: 2.5
    p99: 3.2
  Codes:
    410: 34

All virtual users finished
Summary report @ 04:01:13(+0700) 2019-12-21
  Scenarios launched:  100
  Scenarios completed: 100
  Requests completed:  3500
  RPS sent: 115.97
  Request latency:
    min: 0.6
    max: 5.4
    median: 0.8
    p95: 1.9
    p99: 2.9
  Scenario counts:
    0: 100 (100%)
  Codes:
    410: 3500
```

## Race Condition Test
Run `yarn test:race` to simulate race condition. This will run tests `__raceTests__` folder.

If not passed, then some codes need to be fixed.

# Troubleshooting

## Change Node Version
- Install [NVM](https://github.com/nvm-sh/nvm): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
- Install Node version 10: `nvm install 10`. If the command stuck, then probably Node version 10 has been installed in your computer. Cancel the command.
- Use Node version 10: `nvm use 10`

## Not Able to Push From Sourcetree
Open Sourcetree, by running this command: `open /Applications/SourceTree.app/Contents/MacOS/SourceTree`
