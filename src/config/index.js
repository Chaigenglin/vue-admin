const env = import.meta.env.MODE || 'prod'
console.log(import.meta.env,'huanjing');
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',

  },
  test: {
    baseApi: '/test',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',
  },
  prod: {
    baseApi: '/prod',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',
  }
}

export default {
  env,
  mock: true,
  namespace: 'admin',
  ...EnvConfig[env]
}