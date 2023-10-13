import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: "90%",
    height: "92%",
    padding: SIZES.body5,
    margin: SIZES.body5,
    backgroundColor: COLORS.tertiaryWhite,
    borderRadius: SIZES.body3,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
  },
  title: {
    ...FONTS.h1,
  },
  subtitle: {
    ...FONTS.h3,
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
  }
});

export default styles;
