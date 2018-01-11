import React, { Component } from 'react'

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
                render() {
                    // console.log(2333)
                    console.log(this.props)
                    // const { loading } = this.props
                    // return (loading ? <Com {...this.props} /> : null)
                    return (<Com {...this.props} />)
                }
            }
        }
    }
}