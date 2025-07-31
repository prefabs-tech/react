import { VirtualElement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, {
  RefObject,
  FC,
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { getTooltipConfig } from "./ConfigureTooltip";

type Position = {
  top?: number;
  left?: number;
};

export type TooltipProperties = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  elementRef: RefObject<HTMLElement>;
  mouseTrack?: boolean;
  offset?: number;
  position?: "top" | "bottom" | "right" | "left";
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
      setMousePosition({ top: event.clientY, left: event.clientX });
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
        width: 0,
        height: 0,
        top: mousePosition.top,
        right: mousePosition.left,
        bottom: mousePosition.top,
        left: mousePosition.left,
      }),
    };
  }, [mousePosition]);

  const { styles, attributes } = usePopper(
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
          ref={setTooltipReference}
          className={className ? className : renderedClassName}
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
