import { VirtualElement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { getTooltipConfig } from "./ConfigureTooltip";

export type TooltipProperties = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  elementRef: RefObject<HTMLElement>;
  mouseTrack?: boolean;
  offset?: number;
  position?: "bottom" | "left" | "right" | "top";
};

type Position = {
  left?: number;
  top?: number;
};

export const Tooltip: FC<TooltipProperties> = (tooltipProperties) => {
  const tooltipConfig = getTooltipConfig();

  const {
    children,
    className,
    delay,
    elementRef,
    mouseTrack,
    offset,
    position,
  } = { ...tooltipConfig, ...tooltipProperties };

  const [tooltipReference, setTooltipReference] =
    useState<HTMLDivElement | null>();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Position>({});
  const timeoutIdReference = useRef<ReturnType<typeof setTimeout>>();

  const onMouseEnter = () => {
    clearTimeout(timeoutIdReference.current);
    timeoutIdReference.current = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutIdReference.current);
    setShowTooltip(false);
  };

  const onMouseMove = (event: MouseEvent) => {
    if (mouseTrack) {
      setMousePosition({ left: event.clientX, top: event.clientY });
    }
  };

  const renderClassName = (mouseTrack?: boolean, position?: string) => {
    if (mouseTrack) {
      return "tooltip-container";
    } else {
      return `tooltip-container ${position}`;
    }
  };

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
      element.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
        element.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [elementRef, onMouseEnter, onMouseLeave, onMouseMove]);

  const renderedClassName = renderClassName(mouseTrack, position);

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, []);

  const virtualElement = useMemo(() => {
    return {
      getBoundingClientRect: () => ({
        bottom: mousePosition.top,
        height: 0,
        left: mousePosition.left,
        right: mousePosition.left,
        top: mousePosition.top,
        width: 0,
      }),
    };
  }, [mousePosition]);

  const { attributes, styles } = usePopper(
    mouseTrack
      ? (virtualElement as VirtualElement)
      : (elementRef.current as Element),
    tooltipReference,
    {
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
    },
  );

  if (!showTooltip) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          className={className ? className : renderedClassName}
          ref={setTooltipReference}
          style={styles.popper}
          {...attributes}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};
