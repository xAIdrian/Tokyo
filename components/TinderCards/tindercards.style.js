import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: "90%",
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
    padding: SIZES.body2,
    overflow: 'hidden',
  },
  title: {
    ...FONTS.h2,
    marginTop: SIZES.body3,
  },
  subtitle: {
    ...FONTS.h3,
    width: '100%',
    marginTop: SIZES.body1,
  },
  description: {
    ...FONTS.body3,
    marginTop: SIZES.body3,
  },
  subdescription: {
    ...FONTS.body3,
    marginTop: SIZES.body3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: SIZES.body5,
    borderTopRightRadius: SIZES.body5,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  selecter: {
    width: "100%",
    justifyContent: "center",
    color: COLORS.primary,
    borderRadius: SIZES.body3,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 8,
  },
});

export default styles;
