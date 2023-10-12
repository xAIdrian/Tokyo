import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  container: {
    alignSelf: 'center',
    width: "90%",
    height: "90%",
    padding: SIZES.body5,
    margin: SIZES.body5,
    backgroundColor: COLORS.secondaryBackground,
    borderRadius: SIZES.body3,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  subtitle: {
    fontSize: SIZES.h4,
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default styles;
