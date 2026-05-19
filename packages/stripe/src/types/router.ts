export interface RouteOverride {
  element?: React.ReactNode;
}

export interface RouteOverrides {
  cancelled?: RouteOverride;
  success?: RouteOverride;
}
