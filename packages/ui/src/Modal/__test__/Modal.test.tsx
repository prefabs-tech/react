import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";

import Modal from "..";

describe("Modal", () => {
  const handleHide = vi.fn();

  test("should render modal when visible is true", () => {
    render(
      <Modal onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("should not render modal when visible is false", () => {
    render(
      <Modal onHide={handleHide} visible={false}>
        Modal content
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("should call onHide when the close button is clicked", () => {
    render(
      <Modal onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(handleHide).toHaveBeenCalled();
  });

  test("should apply custom className", () => {
    render(
      <Modal className="custom-class" onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    expect(screen.getByRole("dialog").querySelector(".dz-modal")).toHaveClass(
      "custom-class",
    );
  });

  test("should display header content correctly", () => {
    render(
      <Modal header="Modal header" onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Modal header");
  });

  test("should render JSX header correctly", () => {
    const headerContent = <div>Header content</div>;
    render(
      <Modal header={headerContent} onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  test("should render footer content if passed", () => {
    const footerContent = <div>Footer content</div>;
    render(
      <Modal footer={footerContent} onHide={handleHide} visible={true}>
        Modal content
      </Modal>,
    );

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  test("should render children content", () => {
    const modalContent = <p>Modal content</p>;
    render(
      <Modal onHide={handleHide} visible={true}>
        {modalContent}
      </Modal>,
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });
});
