import { ElMessage, ElMessageBox } from 'src/typings/element-plus';
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $confirm: typeof ElMessageBox.confirm;
  }
}
