import { useRequest } from '@/hooks';
import { useAxios } from '@pole-platform/common';
import { RequestOptions } from '@/hooks/useRequest';
import axios from 'axios';
export function onLogin() {
  return axios.post('');
}

const { data } = useAxios(onLogin);
