"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTooltip = exports.defaultCountryStyle = exports.sizeMap = exports.heightRatio = exports.defaultColor = exports.defaultSize = void 0;
exports.defaultSize = 'xl';
exports.defaultColor = '#dddddd';
exports.heightRatio = 3 / 4;
exports.sizeMap = {
    sm: 240,
    md: 336,
    lg: 480,
    xl: 640,
    xxl: 1200,
};
const defaultCountryStyle = (stroke, strokeOpacity) => (context) => {
    const { countryValue, minValue, maxValue, color } = context;
    const opacityLevel = countryValue
        ? 0.2 + 0.6 * ((countryValue - minValue) / (maxValue - minValue))
        : 0;
    const style = {
        fill: color,
        fillOpacity: opacityLevel,
        stroke,
        strokeWidth: 1,
        strokeOpacity,
        cursor: 'pointer',
    };
    return style;
};
exports.defaultCountryStyle = defaultCountryStyle;
const defaultTooltip = (context) => {
    const { countryName, countryValue, prefix, suffix } = context;
    return `${countryName} ${prefix} ${countryValue.toLocaleString()} ${suffix}`;
};
exports.defaultTooltip = defaultTooltip;
