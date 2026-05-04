interface Properties {
  className?: string;
  description: string;
  onClick: () => void;
  title: string;
}

export const Package = ({
  className,
  description,
  onClick,
  title,
}: Properties) => {
  const classNames = ["package", className].filter((c) => !!c).join(" ");

  return (
    <div className={classNames} onClick={onClick} role="button" tabIndex={0}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
