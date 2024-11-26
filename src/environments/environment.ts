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
      postUndoInvoiceOperation: '/invoice/undo',

      getCountries: '/location/countries',
      getStates: '/location/states',
      getCitiesByState: '/location/cities-by-state/{state}',

      exportStockReport: '/report/stock',
      exportInvoiceHistoryReport: '/report/invoice-history',
    }
  },

  pagination: {
    defaultPage: 0,
    defaultPageSize: 10,
  }

};
