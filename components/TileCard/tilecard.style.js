import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
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
