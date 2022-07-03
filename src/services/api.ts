import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const api = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
});
