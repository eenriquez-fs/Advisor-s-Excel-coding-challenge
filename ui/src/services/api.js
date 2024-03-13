import axios from 'axios';
import humps from 'humps';

// TODO: fix api service such that it will be able to handle binaries correctly

export default (mainRoutePath) => {
  console.log(process.env.API_ENDPOINT);
  const apiInstance = axios.create({
    baseURL: `${process.env.API_ENDPOINT}${mainRoutePath}`,
    headers: {
      credentials: 'same-origin'
    },
    responseType: 'json',
    responseEncoding: 'utf8',
    transformResponse: [
      ...axios.defaults.transformResponse,
      data => humps.camelizeKeys(data)
    ],
    transformRequest: [
      data => humps.decamelizeKeys(data),
      ...axios.defaults.transformRequest
    ]
  });

  apiInstance.interceptors.request.use((config) => {
    const transformedParams = {
      ...humps.decamelizeKeys(config.params),
    };

    return {
      ...config,
      params: transformedParams
    };
  });
  return apiInstance;
};
