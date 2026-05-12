export interface ConfigureTooltipOptions {
  delay?: number;
  mouseTrack?: boolean;
  offset?: number;
  position?: "bottom" | "left" | "right" | "top";
}

const tooltipConfiguration = (): {
  configureTooltip: (options: ConfigureTooltipOptions) => void;
  getTooltipConfig: () => Readonly<ConfigureTooltipOptions>;
} => {
  const tooltipOptions: ConfigureTooltipOptions = {
    delay: 100,
    mouseTrack: false,
    offset: 10,
    position: "right",
  };

  return {
    configureTooltip: (globalTooltipOptions: ConfigureTooltipOptions) => {
      for (const configOption in globalTooltipOptions) {
        if (
          globalTooltipOptions[configOption as keyof ConfigureTooltipOptions]
        ) {
          tooltipOptions[configOption as keyof ConfigureTooltipOptions] =
            globalTooltipOptions[
              configOption as keyof ConfigureTooltipOptions
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any;
        }
      }
    },
    getTooltipConfig: () => {
      return Object.freeze({ ...tooltipOptions });
    },
  };
};

export const { configureTooltip, getTooltipConfig } = tooltipConfiguration();
