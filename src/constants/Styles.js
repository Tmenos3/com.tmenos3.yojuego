export default class Styles {
  static get MAIN_COLOR() { return 'rgb(0, 200, 0)'; }
  static get MAIN_BACKGROUND_COLOR() { return 'rgb(245, 245, 245)'; }
  static get HEADER_STYLE() {
    return {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Styles.MAIN_COLOR
    };
  }
  static get MAIN_CONTAINER() {
    return {
      flex: 1,
      backgroundColor: Styles.MAIN_BACKGROUND_COLOR,
      flexDirection: 'column',
    };
  }
}
