import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import { Tag } from 'antd-mobile'
import TagStyle from 'antd-mobile/lib/tag/style/index.native'
import { Button } from '../components'

import { NavigationActions } from '../utils'

@connect()
class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    console.log(TagStyle)
    console.log(PixelRatio.get())
    return (
      <View style={styles.container}>
        <Button text="Goto detials" onPress={this.gotoDetail} />
        <Tag>这里是一个tag</Tag>
        <View style={styles.test}>
          <Text style={styles.red} >这里是一个测试框</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 32,
  },
  test: {
    width: '110%'
  },
  red: {
    color: 'red',
    textAlign: 'center'
  }
})

export default Home
