import fg from 'fast-glob';
// import rimraf from 'rimraf';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs-extra';
interface filesType {
  name: string;
  value: string;
}
export const readMetadata = async () => {
  const dirs = await fg(['packages/*/package.json'], {});
  const files: filesType[] = [];
  for (const dir of dirs) {
    const { description, isBuild } = fs.readJSONSync(dir);
    if (isBuild) {
      files.push({
        name: dir.split('/')[1] + `(${description || '未知'})`,
        value: dir.split('/')[1],
      });
    }
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
  const { root, needs, dir } = answer;
  /** 排除主应用后，获取需要打包的应用 */
  const dirs = needs.filter((item) => item !== answer.main);
  // const packages = await readMetadata();
  /** 如果根目录存在则删除 */
  if (fs.existsSync(root)) {
    fs.removeSync(root);
  }
  fs.mkdirSync(root);
  /** 如果需要打包的应用中包含主应用则进行打包 */
  if (needs.includes(answer.main)) {
    execSync('pnpm run build', {
      stdio: 'inherit',
      cwd: path.join('packages', answer.main),
    });
    fs.copySync(`packages/${answer.main}/dist`, root);
  }
  for (const name of dirs) {
    process.env.VUE_APP_PUBLIC_PATH = dir ? `/${dir}/${name}` : '/';
    execSync('pnpm run build', {
      stdio: 'inherit',
      cwd: path.join('packages', name),
    });
  }
  /** 创建二级目录 */
  if (dir) {
    fs.mkdirSync(`${root}/${dir}`);
  }
  /** 创建子应用目录 */
  for (const need of dirs) {
    if (dir) {
      fs.mkdirSync(`${root}/${dir}/${need}`);
      fs.copySync(`packages/${need}/dist`, `${root}/${dir}/${need}`);
    } else {
      fs.mkdirSync(`${root}/${need}`);
      fs.copySync(`packages/${need}/dist`, `${root}/${need}`);
    }
  }
};
