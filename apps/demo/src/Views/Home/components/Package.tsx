interface Properties {
  className?: string;
  title: string;
  description: string;
  onClick: () => void;
}

export const Package = ({
  className,
  title,
  description,
  onClick,
}: Properties) => {
  const classNames = ["package", className].filter((c) => !!c).join(" ");

  return (
    <div className={classNames} role="button" tabIndex={0} onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
