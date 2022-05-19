"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
function TextLabel(_a) {
    var { label } = _a, props = (0, tslib_1.__rest)(_a, ["label"]);
    return React.createElement("text", Object.assign({}, props), label);
}
exports.default = TextLabel;
