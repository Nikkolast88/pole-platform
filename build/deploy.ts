import fg from 'fast-glob';
// import rimraf from 'rimraf';
import { execSync } from 'child_process';
import fs from 'fs-extra';
export const readMetadata = async () => {
  const dirs = await fg(['packages/*/package.json'], {});
  const files = [];
  for (const dir of dirs) {
    const { description } = fs.readJSONSync(dir);
    files.push({
      name: dir.split('/')[1] + `(${description || '未知'})`,
      value: dir.split('/')[1],
    });
  }
  return files;
};
interface answerMeta {
  root: string;
  way: string;
  main: string;
  dir: string;
  sub: string[];
  needs: string[];
}
export const setupDeploy = async (answer: answerMeta) => {
  console.log('deploy', answer);
  const { root, needs } = answer;
  const dirs = needs.filter((item) => item !== answer.main);
  // const packages = await readMetadata();
  // for (const name of packages) {
  //   console.log(name);
  //   const output = execSync('pnpm run build', {
  //     stdio: 'inherit',
  //     cwd: path.join('packages', name),
  //   });
  //   console.log(output.toString());
  // }
  if (fs.existsSync(root)) {
    execSync(`rm -rf ${root}`);
  }
  execSync(`mkdir ${root}`);
  for (const need of dirs) {
    execSync(`cd ${root} & mkdir ${need}`);
  }
};
