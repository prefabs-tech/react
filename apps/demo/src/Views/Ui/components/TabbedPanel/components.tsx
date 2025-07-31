import { SubPane, TabbedPanel } from "@prefabs.tech/react-ui";

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-1">
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-1">
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

const CustomActive = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-2" defaultActiveIndex={1}>
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-2" defaultActiveIndex={1}>
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

const DisableStatePersistence = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-3" persistState={false}>
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-3" persistState={false}>
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

const PositionBottom = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-4" position="bottom">
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-4" position="bottom">
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

const PositionLeft = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-5" position="left">
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-5" position="left">
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

const PositionRight = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<TabbedPanel id="tabbed-pannel-6" position="right">
  <SubPane title="Description">Description</SubPane>
  <SubPane title="Reviews">Reviews</SubPane>
  <SubPane title="Specifications">Specifications</SubPane>
  <SubPane title="Pricing">Pricing</SubPane>
</TabbedPanel>`;
  }

  return (
    <TabbedPanel id="tabbed-pannel-6" position="right">
      <SubPane title="Description">Description</SubPane>
      <SubPane title="Reviews">Reviews</SubPane>
      <SubPane title="Specifications">Specifications</SubPane>
      <SubPane title="Pricing">Pricing</SubPane>
    </TabbedPanel>
  );
};

export {
  Basic,
  CustomActive,
  DisableStatePersistence,
  PositionBottom,
  PositionLeft,
  PositionRight,
};
