# @prefabs.tech/react
A set of React libraries to be used in monorepo apps.

## Demo app
Please find our [demo app](https://prefabs-tech.github.io/react/) for examples.

## Packages
  - @prefabs.tech/react-config (https://www.npmjs.com/package/@prefabs.tech/react-config)
  - @prefabs.tech/react-i18n (https://www.npmjs.com/package/@prefabs.tech/react-i18n)
  - @prefabs.tech/react-user (https://www.npmjs.com/package/@prefabs.tech/react-user)
  - @prefabs.tech/react-ui (https://www.npmjs.com/package/@prefabs.tech/react-ui)
  - @prefabs.tech/react-layout (https://www.npmjs.com/package/@prefabs.tech/react-layout)

# Installation & Usage
## Install dependencies
Install dependencies recursively with this command
```
make install
```

## Build all packages
```
make build
```

## Lint code
```
make lint
```

## Typecheck code
```
make typecheck
```

## Test
```
make test
```

# Developing locally & testing
The best way to verify the changes done to the libraries is to test them locally before releasing them. To test libraries locally link each libraries to the `react-app` using `pnpm link` command. [More on pnpm link](https://pnpm.io/cli/link).

To link and unlink the library locally run these commands from the `react-app` where you are linking the library:
```
pnpm link ./<path_to_libraries_monorepo>/packages/<library_name>
```

To unlink the linked library
```
pnpm unlink ./<path_to_libraries_monorepo>/packages/<library_name>
```

## Running demo app

```
make demo
```

## Troubleshooting
  - Make sure that `package.json` and `pnpm-lock.yml` are synchronized.
  - You may need to restart your react-app before link and unlink to see the changes.
  - All the libraries that defines or uses context has to be linked in order to link one libraries that use the context or defines it.
