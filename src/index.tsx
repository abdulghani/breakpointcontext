import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext
} from "react";
import { BreakpointOption, defaultBreakpointOption } from "./constants";

const breakpointContext = createContext<string>("");

const useHook = (breakpointOption: BreakpointOption) => {
  const { default: defaultBreakpoint, breakpoints } = breakpointOption;
  const [breakpoint, setBreakpoint] = useState<string>("");
  const breakpointKeys = useMemo(() => Object.keys(breakpoints), [breakpoints]);
  const determineBreakpoint = useCallback(
    (n: number) => {
      let tempBreakpoint = defaultBreakpoint;
      for (let i = 0; i < breakpointKeys.length; i++) {
        if (n < breakpoints[breakpointKeys[i]]) break;
        tempBreakpoint = breakpointKeys[i];
      }
      return tempBreakpoint;
    },
    [breakpointKeys]
  );
  const shouldUpdateBreakpoint = useCallback(
    (e: any) => {
      const tempBreakpoint = determineBreakpoint(e.target.innerWidth);
      if (tempBreakpoint !== breakpoint) setBreakpoint(tempBreakpoint);
    },
    [determineBreakpoint]
  );

  useEffect(() => {
    window.addEventListener("resize", shouldUpdateBreakpoint);
    return () => window.removeEventListener("resize", shouldUpdateBreakpoint);
  }, []);

  return { breakpoint };
};

const BreakpointProvider = ({
  children,
  option
}: {
  children: React.ReactElement;
  option?: BreakpointOption;
}) => {
  const hook = useHook(option ?? defaultBreakpointOption);

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
