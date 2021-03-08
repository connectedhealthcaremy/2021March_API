'use strict';

/**
 * Logger
 */
var winston = require('winston');
//var logger = new (winston.Logger)();

const logger = winston.createLogger({
    level: 'verbose',//process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
    transports: [new winston.transports.Console()],
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.simple(),
      format.printf(info => `${info.timestamp} ${info[MESSAGE]}`),
    ),
    silent: config.logger.disabled,
  })

/*  
logger.add(winston.transports.Console, {
    level: 'verbose',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false
});
*/

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;
