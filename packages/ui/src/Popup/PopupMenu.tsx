import type { FC, LegacyRef, ReactNode } from "react";

import { Placement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

export interface PopupMenuProperties {
  className?: string;
  content: ReactNode;
  matchReferenceWidth?: boolean;
  offset?: number;
  position?: Placement;
  referenceElement: Element | null;
  toggle?: () => void;
}

export const PopupMenu: FC<PopupMenuProperties> = ({
  className = "",
  content,
  matchReferenceWidth = false,
  offset = 4,
  position = "bottom-start",
  referenceElement,
  toggle,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const portalRoot = document.getElementById("portal-root") || document.body;

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, [offset]);

  const { attributes, styles } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: setOffset,
        },
      },
      {
        name: "hide",
      },
    ],
    placement: position,
  });

  const referenceElementWidth = referenceElement?.getBoundingClientRect().width;

  return createPortal(
    <div
      className={`popup-menu ${className}`.trim()}
      onClick={toggle}
      ref={setPopperElement as LegacyRef<HTMLDivElement>}
      style={{
        ...styles.popper,
        ...styles,
        maxWidth: referenceElementWidth ? referenceElementWidth * 1.5 : "auto",
        width: matchReferenceWidth ? referenceElementWidth : "auto",
      }}
      {...attributes.popper}
    >
      {content}
    </div>,
    portalRoot,
  );
};
