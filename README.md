# Breakpointcontext

a react.js hook for breakpoint that's provided with context for efficient checking

## Install

get it from yarn/npm whatever

```
yarn add @abdulghani/breakpointcontext

npm install @abdulghani/breakpointcontext
```

## Usage

use it as simple as

```typescript
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

```typescript

const MyComponent = () => {
  return (
     <BreakpointContext breakpoints={myBreakpoints}>
      <YourSuperAwesomeChildren>
    </BreakpointContext>
  )
}

```

the option is typed as such

```typescript
type breakpoints = {
  [keys: string]: number; // set of breakpoint value tied to the key as the label
};
```
