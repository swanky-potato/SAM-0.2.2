var winston = require('winston');

  var customLevels = {
    levels: {
    	debug: 0,
      	info: 1,
      	warn: 2,
      	error: 3
    },
    colors: {
    	debug: 'blue',
    	info: 'green',
    	warning: 'yellow',
    	error: 'red'
	}
};

var logger = new (winston.Logger)({
  levels: customLevels.levels,
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, level: 'error' }),
    new winston.transports.File({ filename: LogDir + '/error.log', json: false, level: 'error' })
  ],
  transports: [
    new winston.transports.File({ filename: LogDir + '/warn.log', json: false, level: 'warn' })
  ],
  transports: [
    new winston.transports.File({ filename: LogDir+ '/info.log', json: false, level: 'info' })
  ],
  transports: [
   	new winston.transports.File({ filename: LogDir + '/debug.log', json: false, level: 'debug' })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: LogDir + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;