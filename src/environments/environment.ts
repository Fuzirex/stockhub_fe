export const environment = {
  production: false,

  stockhub_api: {
    baseUrl: 'http://localhost:8080/stockhub-api',
    paths: {
      login: '/authentication/login',
    }
  },

  pagination: {
    defaultPage: 0,
    defaultPageSize: 10,
  }

};
