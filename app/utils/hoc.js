import React, { Component } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'antd-mobile'

export default function authenAndFetchComponent(authenrizationMethod) {
    return function Fetch(fetchMethod) {
        return function Comp(Com) {
            return class extends Component {
                componentWillMount() {
                    const authenMethod = authenrizationMethod ? authenrizationMethod.bind(this) : function noAthen() {
                        return true
                    }
                    const auth = authenMethod()
                    const fetch = fetchMethod ? fetchMethod.bind(this) : function noFetch() {
                        
                    }
                    if(auth) {
                        fetch()
                    }
                }
                shouldComponentUpdate(nextProps, previousProps) {
                    return nextProps !== previousProps
                }
                render() {
                    const { loading } = this.props
                    return loading ? (<View><ActivityIndicator text="玩命加载中"  /></View>) : (<Com {...this.props} />)
                }
            }
        }
    }
}