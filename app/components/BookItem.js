import React from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

class BookItem extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.onClickHander = this.onClickHandler.bind(this)
    }
    onClickHandler() {
        const { clickHandler } = this.props
        if (clickHandler) {
            const handler = clickHandler.bind(this)
        handler()
        }
    }
    render() {
        return (
            <View>
                <Text>这里是一个书本</Text>
            </View>
        )
    }
}

export default BookItem