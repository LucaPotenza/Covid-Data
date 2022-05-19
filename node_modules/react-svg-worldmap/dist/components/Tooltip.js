"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const tslib_1 = require("tslib");
const React = require("react");
const react_path_tooltip_1 = require("react-path-tooltip");
function Tooltip(_a) {
    var { tip } = _a, props = (0, tslib_1.__rest)(_a, ["tip"]);
    return tip ? React.createElement(react_path_tooltip_1.PathTooltip, Object.assign({ fontSize: 12, tip: tip }, props)) : null;
}
exports.Tooltip = Tooltip;
exports.default = Tooltip;
