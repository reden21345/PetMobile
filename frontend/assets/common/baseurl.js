import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'https://petmobile.onrender.com/api/'
: baseURL = 'https://petmobile.onrender.com/api/'
}

export default baseURL;