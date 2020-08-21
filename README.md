# Breakpointcontext

a react.js hook for breakpoint that's provided with context for efficient checking

## Usage

use it as simple as

```tsx
import BreakpointContext, { useBreakpoint } from "@abdulghani/breakpointcontext";

const MyComponent = () => {
  return (
    <BreakpointContext>
      <YourSuperAwesomeChildren>
    </BreakpointContext>
  )
}

// and use it in your component
const YourSuperAwesomeChildren = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === "sm")
    return <div>it's small</div>
  else
    return <div>it's huge</div>
}
```

you can put your own config to define your own set of breakpoints

```tsx

const MyComponent = () => {
  return (
     <BreakpointContext option={myBreakpointConfig}>
      <YourSuperAwesomeChildren>
    </BreakpointContext>
  )
}

```

the option is typed as such

```typescript
declare interface BreakpointOption {
  default: string; // default breakpoint such as xs, sm, etc
  breakpoints: {
    [keys: string]: number; // set of breakpoint value tied to the key as the label
  };
}
```
