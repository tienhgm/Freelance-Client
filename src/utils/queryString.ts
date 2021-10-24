/**
 * Ham nhan vao 1 object tra ve query string tuong ung
 * @param {object} filters
 * @returns
 */
export default function getQueryString(filters: any) {
  let queryString = "";
  for (const filter in filters) {
    if (filters[filter]) {
      if (Array.isArray(filters[filter])) {
        for (const item of filters[filter]) {
          queryString += `${filter}=${item}&`;
        }
      } else {
        queryString += `${filter}=${filters[filter]}&`;
      }
    }
  }
  return queryString;
}
