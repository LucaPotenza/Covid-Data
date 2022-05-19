import type { ComponentProps } from 'react';
declare const isoCodes: string[];
export declare type ISOCode = typeof isoCodes[number] | Lowercase<typeof isoCodes[number]>;
export declare type SizeOption = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface DataItem {
    country: ISOCode;
    value: number;
}
export declare type Data = DataItem[];
export interface CountryContext {
    countryCode: ISOCode;
    countryName: string;
    countryValue?: number;
    color: string;
    minValue: number;
    maxValue: number;
    prefix: string;
    suffix: string;
}
export interface Props {
    data: DataItem[];
    title?: string;
    valuePrefix?: string;
    valueSuffix?: string;
    color?: string;
    strokeOpacity?: number;
    backgroundColor?: string;
    tooltipBgColor?: string;
    tooltipTextColor?: string;
    size?: SizeOption | 'responsive' | number;
    frame?: boolean;
    frameColor?: string;
    borderColor?: string;
    richInteraction?: boolean;
    type?: string;
    styleFunction?: (context: CountryContext) => React.CSSProperties;
    onClickFunction?: (context: CountryContext & {
        event: React.MouseEvent<SVGElement, Event>;
    }) => void;
    tooltipTextFunction?: (context: CountryContext) => string;
    hrefFunction?: (context: CountryContext) => ComponentProps<'a'> | string | undefined;
    textLabelFunction?: (width: number) => ({
        label: string;
    } & ComponentProps<'text'>)[];
}
export {};
