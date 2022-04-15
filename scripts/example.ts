#!/usr/bin/env node
import yargs from 'yargs';
import chalk from 'chalk';
import figlet from 'figlet';
import { hideBin } from 'yargs/helpers';
// 艺术字
console.log(
  chalk.yellow(
    figlet.textSync('BUILD-CLI', {
      horizontalLayout: 'full',
    }),
  ),
);

const args = hideBin(process.argv);
export function init() {
  yargs(args).strict().command(require('./create')).argv;
}
