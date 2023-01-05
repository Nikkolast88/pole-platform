#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import { setupAnswer } from './answer';
// 艺术字
console.log(
  chalk.yellow(
    figlet.textSync('BUILD-CLI', {
      horizontalLayout: 'full',
    }),
  ),
);

export function init() {
  setupAnswer();
}
