import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: "90%",
    height: 625,
    margin: SIZES.body5,
    backgroundColor: COLORS.tertiaryWhite,
    borderRadius: SIZES.body5,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
    position: 'absolute',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    padding: SIZES.body5,
    justifyContent: 'space-evenly',
    alignItems: 'start',
    overflow: 'hidden',
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
    width: '100%',
    height: 200,
    borderTopLeftRadius: SIZES.body5,
    borderTopRightRadius: SIZES.body5,
    alignSelf: 'center',
    resizeMode: 'cover',
  }
});

export default styles;
