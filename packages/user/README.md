# @prefabs.tech/react-user

A React library that provides an easy integration of authentication and user management functionality with SuperTokens.

## Requirements

- @prefabs.tech/react-form
- @prefabs.tech/react-i18n
- @prefabs.tech/react-layout
- @prefabs.tech/react-ui
- axios
- primeicons
- react-toastify

## Installation

Install with npm:

```bash
npm install @prefabs.tech/react-user
```

Install with pnpm:

```bash
pnpm install @prefabs.tech/react-user
```

## Usage

1. Wrap your application code with the `UserWrapper` component

```typescript
// src/main.tsx
import { UserWrapper } from "@prefabs.tech/react-user";

import config, { userConfig } from "./config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // ...
    <UserWrapper config={userConfig}>
      <App />
    </UserWrapper>
  // ...
);
```

2. Use user routes and route handlers from the package in your app's router

```typescript
// src/Router.tsx
import {
  getUserProtectedRoutes,
  getUserPublicRoutes,
  ProtectedRoutesHandler,
  PublicRoutesHandler,
} from "@prefabs.tech/react-user";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BasicLayout />}>
            {/* auth routes */}
            <Route element={<ProtectedRoutesHandler />}> // route handler to perform redirections if user is not authenticated
              {/* protected routes from the package including users, invitations, email verification, etc */}
              {getUserProtectedRoutes()}
            </Route>

            {/* unauth routes */}
            <Route element={<PublicRoutesHandler />}> // route handler to perform redirections if user is authenticated
              {/* public routes from the package including login, signup, forgot password, etc */}
              {getUserPublicRoutes()}
            </Route>

            {/* public routes */}
            // ...
          </Route>
        </Routes>
      </Router>
    </>
  );
};

// src/App.tsx
import { ToastContainer } from "react-toastify";

import { AppRouter } from "./Routers";

export const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-center" />
    </>
  );
};
```

## Configuration

### All configurations can be done with the config prop to UserWrapper component.

#### Minimum required configuration

```
{
  apiBaseUrl: string;
  appDomain: string;
  supertokens: {
    appName: string;
    apiDomain: string;
  };
  supportedRoles: string[]; // array of role strings supported by the app eg ["ADMIN", "SUPERADMIN"]
}
```

#### Using custom paths for provided pages

By default, following paths are used
- acceptInvitation: `'/signup/token/:token'`
- authCallbackGoogle: `'/auth/callback/google'`
- changePassword: `'/change-password'`
- emailVerificationReminder: `'/email-verification-reminder'`
- emailVerificationVerify: `'/verify-email'`
- forgotPassword: `'/forgot-password'`
- login: `'/login'`
- profile: `'/profile'`
- resetPassword: `'/reset-password'`
- signup: `'/signup'`
- signupFirstUser: `'/signup-first-user'`

To customize any path, provide custom value for it in the customPaths config. 
```
{
  // ...
  customPaths: {
    login: '/signin'
    signup: '/register'
  }
}
```

#### Using custom home route, default `'/'`

```
{
  // ...
  homeRoute: "/dashboard"
}
```

```
{
  // ...
  homeRoute: (user: UserType) => "/custom-path"
}
```

#### Customizing features

```
{ // ...
  features?: {
    forgotPassword?: boolean; // default `true`
    signup?: // default true
      | false
      | {
          emailVerification?: boolean; // default `false`
        };
    signupFirstUser?: boolean; // default `false`, requires `signup` to be `false`
    termsAndConditions?: {
      display: boolean;
      label: ReactNode;
      showCheckbox?: boolean;
    };
  };
}
```

#### Enabling social login providers

```
{
  // ...
  socialLoginProviders?: SocialLoginType[]; // currently only 'google' supported
}
```

#### Optional SuperTokens configuration

```
{
  // ...
  supertokens: {
    apiBasePath?: string; // default `/auth`
    sessionConfig?: Session.UserInput;
    thirdPartyEmailPasswordConfig?: ThirdPartyEmailPassword.UserInput;
  };
}
```

### Using custom pages

Custom page components can be used for predefined routes in package by passing routes option to `getUserProtectedRoutes` and `getUerPublicRoutes`

```typescript
// /src/Router.tsx

...
 {getUserProtectedRoutes({
    routes: {
      emailVerificationReminder: {
        element: <CustomEmailVerificationReminderPage />, // custom element for email verification reminder route
      },
    },
  })}

...
  {getUserPublicRoutes({
    routes: {
      login: {
        element: <CustomLoginPage />, // custom element for email verification reminder route
      },
    },
  })}
```

Supported route options by getUserProtectedRoutes
- changePassword
- emailVerificationReminder
- emailVerificationVerify
- profile

Supported route options by getUserPublicRoutes
- acceptInvitation
- authCallbackGoogle
- forgotPassword
- login
- resetPassword
- signup
- signupFirstUser
