import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerValidationErrorType } from 'types/types';

console.log(process.env.REACT_APP_API_URL);

export const coreApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/`,
  withCredentials: true,
  // validateStatus: status => status < 500
});

// basic result codes. used by default in ResponseType
// can be extended if needed
export enum ResultCodes {
  success = 0,
  error = 1,
  authError = 10,
  expiredToken = 11,
}

// all server responses have this type
export type APIResponseType<D = undefined> = {
  resultCode: ResultCodes
  message: string
  data: D
  errors?: Array<ServerValidationErrorType>
}
export const handleResponse = <DataType = undefined>() => (
  (res: AxiosResponse<APIResponseType<DataType>>) => res.data
);

export const handleError = () => (err: AxiosError) => err.response?.data;
