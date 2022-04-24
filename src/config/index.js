const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',

  },
  test: {
    baseApi: '',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',
  },
  pord: {
    baseApi: '',
    mockApi: 'https://www.fastmock.site/mock/b64099ddf8d91cae9f4b28b810ae219d/api',
  }
}

export default {
  env,
  mock: true,
  ...EnvConfig[env]
}