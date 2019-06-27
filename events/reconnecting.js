const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.bgRed(`Reconnecting ${new Date()}`));
};
