import type { CSSProperties } from 'react';
import type { SizeOption, CountryContext } from './types';
export declare const defaultSize = "xl";
export declare const defaultColor = "#dddddd";
export declare const heightRatio: number;
export declare const sizeMap: Record<SizeOption, number>;
export declare const defaultCountryStyle: (stroke: string, strokeOpacity: number) => (context: CountryContext) => CSSProperties;
export declare const defaultTooltip: (context: CountryContext) => string;
