import { StyleSheet } from 'react-native'

import { COLORS, FONTS, SHADOWS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: COLORS.primary,
        minWidth: 150,
        borderRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
        padding: 8,
        right: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginLeft: 0,
        alignSelf: 'center',
        flexDirection: 'row',
    },
})

export default styles
