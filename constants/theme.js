import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    h1: { fontFamily: "raleway-bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "raleway-bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "raleway-bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "raleway-bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "raleway-bold", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "raleway-regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "raleway-regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "raleway-regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "raleway-regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "raleway-regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { FONTS, SIZES }