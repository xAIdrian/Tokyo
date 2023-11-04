import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "90%",
    height: 600,
    padding: SIZES.body5,
    margin: SIZES.body5,
    backgroundColor: COLORS.tertiaryWhite,
    borderRadius: SIZES.body3,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
    position: 'absolute'
  },
  title: {
    ...FONTS.h1,
  },
  subtitle: {
    textAlign: 'start',
    ...FONTS.h3,
    width: '100%',
    marginTop: SIZES.body3,
  },
  description: {
    ...FONTS.body2,
    marginTop: SIZES.body3,
  },
  subdescription: {
    ...FONTS.h4,
    marginTop: SIZES.body1,
  },
  image: {
    // width: '100%',
    alignSelf: 'center',
  }
});

export default styles;
