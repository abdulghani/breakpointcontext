declare interface Breakpoints {
  [keys: string]: number;
}

export declare interface BreakpointOption {
  breakpoints: Breakpoints;
  default: string;
}

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
} as const;

export const defaultBreakpointOption: BreakpointOption = {
  default: "xs",
  breakpoints: defaultBreakpoints
} as const;
