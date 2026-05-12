interface GridContainerProperties {
  children?: React.ReactNode;
  className?: string;
}

const GridContainer: React.FC<GridContainerProperties> = ({
  children,
  className,
}) => {
  return (
    <div className={`dz-grid-container ${className}`.trim()}>{children}</div>
  );
};

export default GridContainer;
