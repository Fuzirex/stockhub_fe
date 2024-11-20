export const environment = {
  production: false,

  stockhubApi: {
    baseUrl: 'http://localhost:8090/stockhub-api',
    paths: {
      login: '/authentication/login',
      getDealer: '/dealer/{cnpj}',
      getStock: '/stock/filter',
      getAllProductType: '/product-type',
      getInvoiceHistory: '/invoice/history',
      getInvoiceOperations: '/invoice/operations',
    }
  },

  pagination: {
    defaultPage: 0,
    defaultPageSize: 10,
  }

};
