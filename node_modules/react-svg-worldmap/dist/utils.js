"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsify = exports.useWindowWidth = void 0;
const React = require("react");
const constants_1 = require("./constants");
function useWindowWidth() {
    const [width, setWidth] = React.useState(constants_1.sizeMap[constants_1.defaultSize]);
    React.useLayoutEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
}
exports.useWindowWidth = useWindowWidth;
function responsify(sizeOption, windowWidth) {
    var _a;
    if (sizeOption === 'responsive') {
        if (typeof window === 'undefined') {
            return constants_1.sizeMap[constants_1.defaultSize];
        }
        return Math.min(window.innerHeight, window.innerWidth) * 0.75;
    }
    if (typeof window === 'undefined') {
        return constants_1.sizeMap[sizeOption];
    }
    const fittingSize = (_a = Object.values(constants_1.sizeMap)
        .reverse()
        .find((size) => size <= windowWidth)) !== null && _a !== void 0 ? _a : constants_1.sizeMap.sm;
    return Math.min(fittingSize, constants_1.sizeMap[sizeOption]);
}
exports.responsify = responsify;
