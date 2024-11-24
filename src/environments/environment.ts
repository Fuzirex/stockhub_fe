export const environment = {
  production: false,

  stockhubApi: {
    baseUrl: 'http://localhost:8090/stockhub-api',
    paths: {
      login: '/authentication/login',
      getDealer: '/dealer/{cnpj}',
      getDealersToTransfer: '/dealer/to-transfer',
      getStock: '/stock/filter',
      getAllProductType: '/product-type',
      getInvoiceHistory: '/invoice/history',
      getInvoiceOperations: '/invoice/operations',
      postInvoiceEntry: '/invoice/entry',
      getCountries: '/location/countries',
      getStates: '/location/states',
      getCitiesByState: '/location/cities-by-state/{state}',
    }
  },

  pagination: {
    defaultPage: 0,
    defaultPageSize: 10,
  }

};
