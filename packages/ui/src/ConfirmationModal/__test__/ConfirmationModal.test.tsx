import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "node:test";
import React from "react";
import { beforeAll, expect, test, vi } from "vitest";

import { ConfirmationModal } from "..";

const confirmationModalData = {
  closeIcon: "pi pi-times",
  header: "Confirmation required",
  message: "Are you sure?",
};

describe("Confirmation modal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  test("should render the confirmation modal when visible is true", () => {
    render(
      <ConfirmationModal
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        visible={true}
      />,
    );

    expect(screen.getByText(confirmationModalData.header)).toBeInTheDocument();
    expect(screen.getByText(confirmationModalData.message)).toBeInTheDocument();
  });

  test("should not render the confirmation modal when visible is false", () => {
    render(
      <ConfirmationModal
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        visible={false}
      />,
    );

    expect(screen.queryByText(confirmationModalData.header)).toBeNull();
    expect(screen.queryByText(confirmationModalData.message)).toBeNull();
  });

  test("should render icon passed as ReactNode correctly", () => {
    render(
      <ConfirmationModal
        header={confirmationModalData.header}
        icon={<span>!</span>}
        message={confirmationModalData.message}
        visible={true}
      />,
    );
    expect(screen.getByText("!")).toBeInTheDocument();
  });

  test("should render close button when closable is true", () => {
    render(
      <ConfirmationModal
        closable={true}
        closeIcon={confirmationModalData.closeIcon}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        visible={true}
      />,
    );

    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();
  });

  test("should not render close button when closable is false", () => {
    render(
      <ConfirmationModal
        closable={false}
        closeIcon={confirmationModalData.closeIcon}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        visible={true}
      />,
    );

    const closeButton = screen.queryByTestId("close-button");
    expect(closeButton).toBeNull();
  });

  test("should call accept function when 'Yes' button is clicked", () => {
    const hanldeAccept = vi.fn();
    render(
      <ConfirmationModal
        accept={hanldeAccept}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        onHide={vi.fn()}
        visible={true}
      />,
    );
    fireEvent.click(screen.getByText("Yes"));
    expect(hanldeAccept).toHaveBeenCalled();
  });

  test("should call reject function when 'No' button is clicked", () => {
    const handleReject = vi.fn();
    render(
      <ConfirmationModal
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        onHide={vi.fn()}
        reject={handleReject}
        visible={true}
      />,
    );
    fireEvent.click(screen.getByText("No"));
    expect(handleReject).toHaveBeenCalled();
  });

  test("should call onHide when close icon is clicked", () => {
    const handleHide = vi.fn();
    render(
      <ConfirmationModal
        closeIcon={confirmationModalData.closeIcon}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        onHide={handleHide}
        visible={true}
      />,
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(handleHide).toHaveBeenCalled();
  });
});
