import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

import { Data } from "..";

describe("Data Component", () => {
  test("Component matches snapshot with all props", () => {
    const { container } = render(<Data caption="Name" value="John" />);
    expect(container).toMatchSnapshot();
  });

  test("matches the snapshot with 'stat' mode", () => {
    const { container } = render(
      <Data caption="Name" mode="stat" value="John" />,
    );
    expect(container).toMatchSnapshot();
  });

  test("matches the snapshot with custom className", () => {
    const { container } = render(
      <Data caption="Name" className="custom-class" value="John" />,
    );
    expect(container).toMatchSnapshot();
  });

  test("matches the snapshot with ReactNode as caption and value", () => {
    const caption = <span>Name</span>;
    const value = <strong>John</strong>;

    const { container } = render(<Data caption={caption} value={value} />);
    expect(container).toMatchSnapshot();
  });
});
