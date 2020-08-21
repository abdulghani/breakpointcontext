import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext
} from "react";
import { Breakpoints, defaultBreakpoints } from "./constants";

const breakpointContext = createContext<string>("");

const useHook = (breakpoints: Breakpoints) => {
  const breakpointKeys = useMemo(
    () =>
      Object.entries(breakpoints)
        .sort((a, b) => a[1] - b[1])
        .map((item) => item[0]),
    [breakpoints]
  );
  const determineBreakpoint = useCallback(
    (n: number) => {
      let tempBreakpoint = breakpointKeys[0];
      for (let i = 0; i < breakpointKeys.length; i++) {
        if (n < breakpoints[breakpointKeys[i]]) break;
        tempBreakpoint = breakpointKeys[i];
      }
      return tempBreakpoint;
    },
    [breakpointKeys]
  );
  const [breakpoint, setBreakpoint] = useState<string>(() =>
    determineBreakpoint(window.innerWidth)
  );
  const shouldUpdateBreakpoint = useCallback(
    (e: any) => {
      const tempBreakpoint = determineBreakpoint(e.target.innerWidth);
      if (tempBreakpoint !== breakpoint) setBreakpoint(tempBreakpoint);
    },
    [breakpoint, determineBreakpoint]
  );

  useEffect(() => {
    window.addEventListener("resize", shouldUpdateBreakpoint);
    return () => window.removeEventListener("resize", shouldUpdateBreakpoint);
  });

  return { breakpoint };
};

const BreakpointProvider = ({
  children,
  breakpoints
}: {
  children: React.ReactElement;
  breakpoints?: Breakpoints;
}) => {
  const hook = useHook(breakpoints ?? defaultBreakpoints);

  return (
    <breakpointContext.Provider value={hook.breakpoint}>
      {children}
    </breakpointContext.Provider>
  );
};

export default BreakpointProvider;

export const useBreakpoint = (): string => {
  return useContext(breakpointContext);
};
