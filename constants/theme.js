import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
  primary: '#3A3967',
  secondary: '#FF9800',
  white: '#FFFFFF',
  secondaryWhite: '#F7F7FC',
  tertiaryWhite: '#FDFBF8',
  green: '#2CC069',
  black: '#000000',
  secondaryBlack: '#5D4037',
  gray: '#CCCCCC',
  secondaryGray: '#808080',
  secondaryBackground: '#F2E9D3',
}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36, color: COLORS.primary },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30, color: COLORS.primary },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22, color: COLORS.primary },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20, color: COLORS.primary },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36, color: COLORS.primary },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30, color: COLORS.primary },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22, color: COLORS.primary },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20, color: COLORS.primary },
}

export const SHADOWS = {
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
