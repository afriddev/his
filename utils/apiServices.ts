/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { decryptResponse, encryptRequest } from './appUtils';

export const BASE_URL = ' http://localhost:5000/';

export async function getAPI(url: string) {
  const { data } = await axios.get(BASE_URL + url, {
    withCredentials: true,
  });
  return await decryptResponse(data);
}

export async function postAPI(url: string, payload: any) {
  const { data } = await axios.post(BASE_URL + url, await encryptRequest(payload), {
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
  });
  return decryptResponse(data);
}
