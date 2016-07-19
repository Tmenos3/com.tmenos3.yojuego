var assign = require('object-assign');
import {
  Dimensions
} from 'react-native';

var StyleHelper = assign({}, {
  deviceWith: Dimensions.get('window').width,

  deviceHeight: Dimensions.get('window').height
});
module.exports = StyleHelper;
