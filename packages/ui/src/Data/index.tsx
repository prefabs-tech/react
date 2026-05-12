import { FC, ReactNode } from "react";

type DataProperties = {
  caption: ReactNode;
  className?: string;
  mode?: "attr" | "stat";
  value: ReactNode;
};

export const Data: FC<DataProperties> = ({
  caption,
  className = "",
  mode = "attr",
  value,
}) => {
  return (
    <div
      className={`data ${mode === "stat" ? "data-stat" : ""} ${className}`.trim()}
    >
      <div className="label">{caption}</div>
      <div className="value">{value}</div>
    </div>
  );
};
