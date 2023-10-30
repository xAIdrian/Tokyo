import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: '100%',
    padding: 0,
    margin: 0,
    flexDirection: 'row',
  },
  timeLeftText: {
    top: 0,
    left: 0,
    ...FONTS.h1,
    color: COLORS.secondary
  },
  timeLeftLabelBelow: {
    top: 0,
    left: 0,
    ...FONTS.body3,
    color: COLORS.secondary,
    marginHorizontal: 8
  },
});

export default styles;
