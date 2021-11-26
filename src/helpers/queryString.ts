/**
 * Ham nhan vao 1 object tra ve query string tuong ung
 * @param {object} filters
 * @returns
 */
import queryString from 'query-string';

export default function getQueryString(filters: any) {
  return queryString.stringify(filters);
}
