import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import DropdownMenu from "..";
import { MenuItem } from "../Menu";

const menuItems = [
  {
    icon: "pi pi-lock",
    label: "user title",
  },
  {
    icon: "pi pi-user",
    label: "user profile",
  },
];

const template = (item: MenuItem) => {
  return (
    <>
      <i style={{ marginRight: "0.5rem" }}></i>
      <span>{item.label}</span>
    </>
  );
};

describe("DropdownMenu", () => {
  test("should match snapshot with default props", () => {
    const { container } = render(<DropdownMenu menu={menuItems} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with empty menu", () => {
    const { container } = render(<DropdownMenu menu={[]} />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with hideDropdownIcon set to true", () => {
    const { container } = render(
      <DropdownMenu hideDropdownIcon menu={menuItems} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom className", () => {
    const { container } = render(
      <DropdownMenu className="custom-class" menu={menuItems} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom position", () => {
    const { container } = render(
      <DropdownMenu menu={menuItems} position="top-start" />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom label", () => {
    const { container } = render(
      <DropdownMenu label="Custom Label" menu={menuItems} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom trigger", () => {
    const { container } = render(
      <DropdownMenu
        menu={menuItems}
        trigger={<button>Custom Trigger</button>}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom menu templating", () => {
    const { container } = render(
      <DropdownMenu menu={menuItems} renderOption={template} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with all props set", () => {
    const { container } = render(
      <DropdownMenu
        className="dropdown-menu"
        hideDropdownIcon={true}
        isOpen={true}
        label="Custom Label"
        menu={menuItems}
        position="top-end"
        trigger={<button>Trigger Button</button>}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
