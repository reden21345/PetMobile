import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.1.9:3001/api/'
: baseURL = 'http://192.168.1.9:3001/api/'
}

export default baseURL;