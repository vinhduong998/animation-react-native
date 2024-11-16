import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const commonErrorProperties: Array<keyof SerializedError> = ['name', 'message', 'stack', 'code'];
/**
* serialize function used for async action errors,
* since the default function from Redux Toolkit strips useful info from axios errors
* *
*/
export const serializeAxiosError = (value: any): AxiosError | SerializedError => {
  if (typeof value === 'object' && value !== null) {
    if (value.isAxiosError) {
      return {
        name: value?.response?.data?.error || '',
        message: JSON.stringify(value?.response?.data?.message),
        stack: '',
        code: value?.response?.data?.status || 500
      };
    } else {
      const simpleError: SerializedError = {};
      for (const property of commonErrorProperties) {
        if (typeof value[property] === 'string') {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};