import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: () => ({
    width: 250,
    padding: SIZES.body1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.body3,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.black
    ,
  }),
  logoContainer: () => ({
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.body3,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    marginTop: SIZES.body5 / 1.5,
  },
  infoContainer: {
    paddingTop: SIZES.body3,
  },
  subtitle: () => ({
    fontSize: SIZES.body1,
    color: COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  description: () => ({
    fontSize: SIZES.body3 - 2,
    color: COLORS.primary,
  }),
  info: {
    fontSize: SIZES.body3 - 2,
    color: COLORS.primary,
    marginTop: SIZES.body3
  },
});

export default styles;
