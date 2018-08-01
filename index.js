var util = require('util');

function logError(message) {
    this.message = message;
}
util.inherits(logError, Error);
logError.prototype.name = "LogError";



var Log = { };

Object.defineProperties(Log, {
    STATE: {
        value: {
            OFF: 0,
            DEV: 1,
            TEST: 2,
            RELEASE: 3,
            ERROR: 4
        },
        writable: false,
        configurable: false
    },

    lastMessage: { 
        value: '',
        writable: true,
        configurable: false
    },

    _logState: {
        value: 3,
        writable: true,
        configurable: false
    },

    logState: {
        set: function(val) { 
            if ((val >= 0) & (val < 5)) {
                this._logState = val
            } else {
                throw new logError('No such log state: ' + val);
            } 
        },
        get: function() { return this._logState; }
    }, 


    /// <summary>
    /// Adds some message to log
    /// <param name="state"> 
    ///     Set message importance
    ///     1 - Show only in development mode (NODE_ENV=development)
    ///     2 - Show in debug and development modes (NODE_ENV=development, NODE_ENV=debug)
    ///     3 - Show in release
    ///     4 - Error! Show in all modes, exept 0
    /// </param>
    /// <param name="state"> 
    ///     Message to show
    /// </param>
    /// </summary>
    add: {
        value: function(message, state = 2) {
            switch (state) {
                case 0: break;
                case 1:
                    message = 'DEV: ' + message;
                    this.logState == 1 ? console.log(message) : null;
                    break;
                case 2:
                    message = 'TEST: ' + message;
                    (this.logState == 1 || this.logState == 2) ? console.log(message) : null;
                    break;
                case 3:
                    message = '* ' + message;
                    (this.logState == 1 || this.logState == 2 || this.logState == 3) ? console.log(message) : null;
                    break;
                case 4:
                    message = 'ERROR: ' + message;
                    (this.logState != 0) ? console.log(message) : null;
                    break;
    
        
                default:
                    throw new logError('No such log message state: ' + state);
                    return false;
            }
            lastMessage = message;
            return true;
        }
    }
});

try {
    if (process.env.NODE_ENV.includes('silent')) {Log.logState = 0; } 
    else { if(process.env.NODE_ENV.includes('development'))  {Log.logState = 1} 
    else { if(process.env.NODE_ENV.includes('debug'))  {Log.logState = 2} 
    else { if(process.env.NODE_ENV.includes('production'))  {Log.logState = 3 } 
    else { if(process.env.NODE_ENV.includes('errorOnly'))  {Log.logState = 4} 
    else { Log.logState = 3; }}}}}
} catch (error) {
    Log.logState = 3
}

exports.Log = Log;