"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const Region = React.forwardRef(function Region(_a, ref) {
    var { href } = _a, props = (0, tslib_1.__rest)(_a, ["href"]);
    const path = (React.createElement("path", Object.assign({ onMouseOver: (event) => {
            event.currentTarget.style.strokeWidth = '2';
            event.currentTarget.style.strokeOpacity = '0.5';
        }, onMouseOut: (event) => {
            event.currentTarget.style.strokeWidth = '1';
            event.currentTarget.style.strokeOpacity = `${props.strokeOpacity}`;
        }, ref: ref }, props)));
    if (href) {
        return React.createElement("a", Object.assign({}, (typeof href === 'string' ? { href } : href)), path);
    }
    return path;
});
exports.default = Region;
