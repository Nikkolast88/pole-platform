import inquirer from 'inquirer';
import { readMetadata, setupDeploy } from './deploy';
const setupAsk = [
  {
    name: 'root',
    type: 'string',
    default: 'dist',
    message: '打包目录:',
  },
  {
    name: 'way',
    type: 'list',
    message: '部署方式:',
    choices: [
      {
        name: '单独部署',
        value: 'single',
      },
      {
        name: '二级目录',
        value: 'sub',
      },
    ],
  },
  {
    name: 'way',
    type: 'list',
    message: '部署方式:',
    choices: [
      {
        name: '单独部署',
        value: 'single',
      },
      {
        name: '二级目录',
        value: 'sub',
      },
    ],
  },
  {
    name: 'main',
    type: 'list',
    message: '主应用:',
    default: 'core',
    choices: [],
  },
];
export const setupAnswer = async () => {
  const packages = await readMetadata();
  setupAsk[3].choices = packages;
  const answer = await inquirer.prompt(setupAsk);
  const { main, way } = answer;
  let dirAnswer = {};
  const sub = packages.filter((item) => item.value !== main);
  const subAsk = [
    {
      name: 'subs',
      type: 'checkbox',
      message: '子应用:',
      default: sub.map((item) => item.value),
      choices: sub,
    },
  ];
  const subAnswer = await inquirer.prompt(subAsk);
  // 二级目录，需询问二级目录名称
  if (way === 'sub') {
    const dirAsk = [
      {
        name: 'dir',
        type: 'string',
        message: '二级目录名称:',
        default: 'apps',
      },
    ];
    dirAnswer = await inquirer.prompt(dirAsk);
  }
  // 询问哪些模块需要打包，默认全部
  let needAnswer = {};
  const needAsk = [
    {
      name: 'needs',
      type: 'checkbox',
      message: '需要打包的应用:',
      default: packages.map((item) => item.value),
      choices: packages,
      validate: (answer) => {
        if (answer.length < 1) {
          return '至少选择一个应用';
        }
        return true;
      },
    },
  ];
  needAnswer = await inquirer.prompt(needAsk);
  await setupDeploy({ ...answer, ...dirAnswer, ...subAnswer, ...needAnswer });
};
