/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { StyleSheet } from "react-native";

import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    marginTop: SIZES.body5 / 1.5,
  },
  infoContainer: {
    paddingTop: SIZES.body3,
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
