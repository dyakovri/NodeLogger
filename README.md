# Simplest Node Logger
This is the simplest logger for your Node.js project. It hasn't any dependencies.

## Usage
Install NodeLogger from npm
    npm i ds-node-logger
or
    npm i git+https://github.com/dyakovri/ds-node-logger.git

You can require logger in any file: 
    var Log = require('./index.js').Log;

Than use `Log.add(message)` or `Log.add(message, state)` to log message.

### Message states
0 - Do not show message
1 - Show only in development mode
2 - Show in debug and development modes
3 - Show in release, debug and development modes
4 - Error! Show in all modes, exept 0

You can use enum codes from `Log.STATE`:
    STATE {
        OFF: 0,
        DEV: 1,
        TEST: 2,
        RELEASE: 3,
        ERROR: 4
    }

By default, message state is 2 (`DEBUG`).

### Logger states
You can change logger state using `Log.loggerState` variable or by using `NODE_ENV` environment variable:
    Log.loggetState = 0 // NODE_ENV=silent - logger switched off
    Log.loggetState = 1 // NODE_ENV=development - show all messages (message states 1, 2, 3, 4)
    Log.loggetState = 2 // NODE_ENV=debug - show release, debug messages and errors (message states 2, 3, 4)
    Log.loggetState = 3 // NODE_ENV=production - show release messages and errors (message states 3, 4)
    Log.loggetState = 4 // NODE_ENV=errorOnly - show only errors (message state 4)

By default, logger state is 3 (`production`) 