import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: SIZES.body5,
    backgroundColor: COLORS.tertiaryWhite,
    borderRadius: SIZES.body3,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: SIZES.body5 / 1.5,
  },
  infoContainer: {
    paddingTop: SIZES.body3,
    alignItems: 'center'
  },
  subtitle: {
    fontSize: SIZES.body2 - 4,
    color: COLORS.primary,
  },
  info: {
    fontSize: SIZES.body3,
    color: COLORS.primary,
    marginTop: SIZES.body3
  },
  selecter: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    color: COLORS.primary,
    paddingVertical: SIZES.body3,
    marginTop: SIZES.body3,
    borderRadius: SIZES.body3,
  },
});

export default styles;
