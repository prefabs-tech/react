import { Placement } from "@popperjs/core";
import {
  FC,
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { PopupMenu } from "./PopupMenu";

export type PopupProperties = UncontrolledProperties & {
  close?: () => void;
  isControlled?: boolean;
  isOpen?: boolean;
  toggle?: () => void;
};

interface UncontrolledProperties {
  className?: string;
  content: JSX.Element;
  offset?: number;
  position?: Placement;
  trigger: ReactNode;
}

export const Popup: FC<PopupProperties> = ({
  className = "",
  close,
  content,
  isControlled = false,
  isOpen: isOpenControlled,
  offset = 10,
  position,
  toggle,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const togglePopup = isControlled
    ? toggle
    : () => {
        setIsOpen((previousIsOpen) => !previousIsOpen);
      };

  const closePopup = isControlled
    ? close
    : () => {
        setIsOpen(false);
      };

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!referenceElement) {
        return;
      }

      const popperElement = document.querySelector(".popup-menu");

      if (
        popperElement &&
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      ) {
        closePopup?.();
      }
    },
    [referenceElement, closePopup],
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className={`popup-container ${className}`.trim()}>
      <div
        aria-controls="popup-content"
        aria-expanded={isControlled ? isOpenControlled : isOpen}
        className="popup-trigger"
        onClick={togglePopup}
        ref={setReferenceElement as LegacyRef<HTMLDivElement>}
      >
        {trigger}
      </div>
      {(isControlled ? isOpenControlled : isOpen) ? (
        <PopupMenu
          content={content}
          offset={offset}
          position={position}
          referenceElement={referenceElement}
          toggle={togglePopup}
        />
      ) : null}
    </div>
  );
};
