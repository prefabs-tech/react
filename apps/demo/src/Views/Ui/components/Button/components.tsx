import { Button } from "@prefabs.tech/react-ui";

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
  <Button label="Primary" severity="primary" />
  <Button label="Secondary" severity="secondary" />
  <Button label="Alternate" severity="alternate" />
  <Button label="Success" severity="success" />
  <Button label="Danger" severity="danger" />
  <Button label="Warning" severity="warning" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Primary" severity="primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Alternate" severity="alternate" />
      <Button label="Success" severity="success" />
      <Button label="Danger" severity="danger" />
      <Button label="Warning" severity="warning" />
    </div>
  );
};

const Size = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
  <Button label="Small" size="small" variant="filled" severity="primary" />
  <Button
    label="Medium"
    size="medium"
    variant="filled"
    severity="primary"
  />
  <Button label="Large" size="large" variant="filled" severity="primary" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Small" size="small" variant="filled" severity="primary" />
      <Button
        label="Medium"
        size="medium"
        variant="filled"
        severity="primary"
      />
      <Button label="Large" size="large" variant="filled" severity="primary" />
    </div>
  );
};

const Variant = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
  <Button label="Default" size="medium" />
  <Button label="Outlined" size="medium" variant="outlined" />
  <Button label="Text only" size="medium" variant="textOnly" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Default" size="medium" />
      <Button label="Outlined" size="medium" variant="outlined" />
      <Button label="Text only" size="medium" variant="textOnly" />
    </div>
  );
};

const Icons = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return ` <div className="container">
  <Button size="small" label="Text only" iconLeft="pi pi-user" variant="textOnly" />
  <Button size="medium" label="Outlined" iconLeft="pi pi-user" variant="outlined" />
  <Button label="Default" iconLeft="pi pi-user" size="large" />
</div>
<div className="container">
  <Button label="Text only" iconLeft="pi pi-user" size="small" variant="textOnly" rounded />
  <Button label="Outlined" iconLeft="pi pi-user" size="medium" variant="outlined" rounded />
  <Button label="Default" rounded iconLeft="pi pi-user" size="large" />
</div>
<div className="container">
  <Button size="small" variant="textOnly" severity="secondary" iconLeft="pi pi-user" />
  <Button size="medium" variant="filled" iconRight="pi pi-user" />
  <Button size="large" variant="outlined" severity="secondary" iconLeft="pi pi-check" />
</div>
<div className="container">
  <Button size="small" variant="textOnly" severity="secondary" iconLeft="pi pi-user" rounded />
  <Button size="medium" variant="filled" iconRight="pi pi-user" rounded />
  <Button size="large" variant="outlined" severity="secondary" rounded iconLeft="pi pi-check" />
</div>`;
  }

  return (
    <>
      <div className="container">
        <Button
          size="small"
          label="Text only"
          iconLeft="pi pi-user"
          variant="textOnly"
        />
        <Button
          size="medium"
          label="Outlined"
          iconLeft="pi pi-user"
          variant="outlined"
        />
        <Button label="Default" iconLeft="pi pi-user" size="large" />
      </div>
      <div className="container">
        <Button
          label="Text only"
          iconLeft="pi pi-user"
          size="small"
          variant="textOnly"
          rounded
        />
        <Button
          label="Outlined"
          iconLeft="pi pi-user"
          size="medium"
          variant="outlined"
          rounded
        />
        <Button label="Default" rounded iconLeft="pi pi-user" size="large" />
      </div>
      <div className="container">
        <Button
          size="small"
          variant="textOnly"
          severity="secondary"
          iconLeft="pi pi-user"
        />
        <Button size="medium" variant="filled" iconRight="pi pi-user" />
        <Button
          size="large"
          variant="outlined"
          severity="secondary"
          iconLeft="pi pi-user"
        />
      </div>
      <div className="container">
        <Button
          size="small"
          variant="textOnly"
          severity="secondary"
          iconLeft="pi pi-user"
          rounded
        />
        <Button size="medium" variant="filled" iconRight="pi pi-user" rounded />
        <Button
          size="large"
          variant="outlined"
          severity="secondary"
          rounded
          iconLeft="pi pi-user"
        />
      </div>
    </>
  );
};

const Link = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<div className="container">
  <Button label="Home" to="/" />
  <Button label="Back" severity="secondary" to="/ui" />
</div>`;
  }

  return (
    <div className="container">
      <Button label="Home" to="/" />
      <Button label="Back" severity="secondary" to="/ui" />
    </div>
  );
};

export { Basic, Size, Variant, Icons, Link };
