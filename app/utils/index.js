import { Dimensions } from 'react-native'

export { NavigationActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export const scale = Dimensions.get('window').width / 375 / 2