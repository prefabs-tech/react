import type { ComponentType } from "react";

export interface RouteOverride {
  component?: ComponentType;
  path?: string;
}

export interface RouteOverrides {
  cancelled?: RouteOverride;
  success?: RouteOverride;
}
