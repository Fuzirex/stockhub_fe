export class Pagination {
  page!: number;
  pageSize!: number;
  totalElements!: number;

  constructor(page: number, pageSize: number, totalElements: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalElements = totalElements;
  }
}
