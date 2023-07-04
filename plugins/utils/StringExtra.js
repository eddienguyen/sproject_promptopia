export default class StringExtra {
  /**
   *
   * @param {string} item
   * @return {boolean}
   */
  static isEmpty(item) {
    return item === null || item.match(/^ *$/) !== null;
  }
}
