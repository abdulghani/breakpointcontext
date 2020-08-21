export declare interface Breakpoints {
  [keys: string]: number;
}

export const defaultBreakpoints: Breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
} as const;
