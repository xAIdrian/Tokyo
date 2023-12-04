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
  editBar: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: SIZES.body3,
    borderTopRightRadius: SIZES.body3,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.tertiaryWhite,
    borderRadius: SIZES.body3,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
    marginTop: SIZES.body3,
  },
  title: {
    fontSize: SIZES.h4,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
    padding: 4,
  },
  infoContainer: {
    padding: SIZES.body4,
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
  primarySelector: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    marginTop: SIZES.body3,
    borderRadius: SIZES.body3,
    borderWidth: 1,
    borderColor: COLORS.primary,
    fontSize: SIZES.body2,
  },
  secondarySelector: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    color: COLORS.primary,
    paddingVertical: 8,
    marginTop: SIZES.body3,
    borderRadius: SIZES.body3,
    borderWidth: 1,
    borderColor: COLORS.primary,
    fontSize: SIZES.body2,
  },
});

export default styles;
