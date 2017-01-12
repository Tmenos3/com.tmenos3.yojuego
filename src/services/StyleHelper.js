import {
  Dimensions
} from 'react-native';

export default class StyleHelper {
  static get deviceWith() { return Dimensions.get('window').width; }

  static get deviceHeight() { return Dimensions.get('window').height; }
}
