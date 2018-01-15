import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
// import { Tag } from 'antd-mobile'
// import TagStyle from 'antd-mobile/lib/tag/style/index.native'
// import { Button } from '../components'
import BookItem from '../components/BookItem'

import { NavigationActions, scale } from '../utils'
import authenAndFetchComponent from '../utils/hoc'

@connect()
class Home extends Component {
  static navigationOptions = {
    title: '有毒阅读',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[{ width: 20, height: 20}, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }
  
  gotoDetail = () => { 
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    const { model } = this.props
    const { data } = model
    const { ret } = data
    const  first  = ret[0]
    console.log(first)
    return (
      <View>
        <View style={styles.test} >
          <View><Text>热门推荐</Text></View>
          <View style={styles.border} />
          <View><Text>新番速递</Text></View>
        </View>
        <View>
          <BookItem />
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  test: {
    display: 'flex',
    flexDirection: 'row',
    width: 309 * scale,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 221.5 * scale,
    marginTop: 38 * scale,
  },
  container: {
    width: 750 * scale,
    flex: 1
  },
  icon: {
    width: 38.4,
    height: 38.4
  },
  title: {
    width: 309 * scale,
    height: 45 * scale,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 221.5 * scale,
    marginTop: 38 * scale,
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  titleItem: {
    // flex: 1
  },
  border: {
    width: 4 * scale,
    height: 20 * scale,
    borderColor: '#B7B3B3',
    borderWidth: 2 * scale,
    // marginTop: 8 * scale
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  text: {
    fontSize: 32 * scale,
  }
})
// console.log(styles)

function fetchMethods() {
  this.props.dispatch({ type: 'home/fetch'}).catch(e => console.log(e))
}
function mapStateToProps(state) {
  return {
    loading: state.home.loading,
    model: state.home
  }
}

const AuthFetchHome = connect(mapStateToProps)(authenAndFetchComponent()(fetchMethods)(Home)) 

export default AuthFetchHome
