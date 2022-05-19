"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function Frame({ color }) {
    return (React.createElement("rect", { x: 0, y: 0, width: '100%', height: '100%', stroke: color, fill: "none" }));
}
exports.default = Frame;
