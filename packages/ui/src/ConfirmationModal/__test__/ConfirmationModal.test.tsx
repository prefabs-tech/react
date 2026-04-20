import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeAll, describe, expect, test, vi } from "vitest";

import { ConfirmationModal } from "..";

const confirmationModalData = {
  header: "Confirmation required",
  message: "Are you sure?",
  closeIcon: "pi pi-times",
};

describe("Confirmation modal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  test("should render the confirmation modal when visible is true", () => {
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
      />,
    );

    expect(screen.getByText(confirmationModalData.header)).toBeInTheDocument();
    expect(screen.getByText(confirmationModalData.message)).toBeInTheDocument();
  });

  test("should not render the confirmation modal when visible is false", () => {
    render(
      <ConfirmationModal
        visible={false}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
      />,
    );

    expect(screen.queryByText(confirmationModalData.header)).toBeNull();
    expect(screen.queryByText(confirmationModalData.message)).toBeNull();
  });

  test("should render icon passed as ReactNode correctly", () => {
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        icon={<span>!</span>}
      />,
    );
    expect(screen.getByText("!")).toBeInTheDocument();
  });

  test("should render close button when closable is true", () => {
    render(
      <ConfirmationModal
        visible={true}
        closable={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        closeIcon={confirmationModalData.closeIcon}
      />,
    );

    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();
  });

  test("should not render close button when closable is false", () => {
    render(
      <ConfirmationModal
        visible={true}
        closable={false}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        closeIcon={confirmationModalData.closeIcon}
      />,
    );

    const closeButton = screen.queryByTestId("close-button");
    expect(closeButton).toBeNull();
  });

  test("should call accept function when 'Yes' button is clicked", () => {
    const hanldeAccept = vi.fn();
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        accept={hanldeAccept}
        onHide={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Yes"));
    expect(hanldeAccept).toHaveBeenCalled();
  });

  test("should call reject function when 'No' button is clicked", () => {
    const handleReject = vi.fn();
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        reject={handleReject}
        onHide={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("No"));
    expect(handleReject).toHaveBeenCalled();
  });

  test("should call onHide when close icon is clicked", () => {
    const handleHide = vi.fn();
    render(
      <ConfirmationModal
        visible={true}
        header={confirmationModalData.header}
        message={confirmationModalData.message}
        closeIcon={confirmationModalData.closeIcon}
        onHide={handleHide}
      />,
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(handleHide).toHaveBeenCalled();
  });
});
