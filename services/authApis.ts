import { loginRequestDataType, registerRequestDataType } from '@/types/authDataTypes';
import { postAPI } from '@/utils/apiServices';

export function loginAPI(data: loginRequestDataType) {
  return postAPI('auth/login', data);
}
export function registerAPI(data: registerRequestDataType) {
  return postAPI('auth/register', data);
}
