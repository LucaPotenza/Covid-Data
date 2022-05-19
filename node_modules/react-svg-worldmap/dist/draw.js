"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawTooltip = void 0;
const React = require("react");
const react_path_tooltip_1 = require("react-path-tooltip");
function drawTooltip(tip, tooltipBgColor, tooltipTextColor, idx, triggerRef, containerRef) {
    return tip ? (React.createElement(react_path_tooltip_1.PathTooltip, { fontSize: 12, bgColor: tooltipBgColor, textColor: tooltipTextColor, key: `path_${idx}_xyz`, pathRef: triggerRef, svgRef: containerRef, tip: tip })) : null;
}
exports.drawTooltip = drawTooltip;
