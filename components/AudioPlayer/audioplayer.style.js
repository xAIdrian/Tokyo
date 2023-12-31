/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { StyleSheet } from 'react-native'

import { COLORS, FONTS, SHADOWS, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiaryWhite,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    bubble: {
        backgroundColor: COLORS.white,
        minWidth: 100,
        borderRadius: 30,
        borderBottomRightRadius: 30,
        marginVertical: 10,
        padding: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginLeft: 0,
        alignSelf: 'center',
        flexDirection: 'row',
    }
})

export default styles
