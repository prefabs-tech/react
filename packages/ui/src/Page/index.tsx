import { DetailedHTMLProps, HTMLAttributes } from "react";

import { PageHeader } from "./Header";
import LoadingPage, { LoadingPageProperties } from "../LoadingPage";

interface PageProperties extends Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "aria-orientation"
> {
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  centered?: boolean;
  errorMessage?: string;
  titleTag?: string | React.ReactNode;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  loadingPageStyle?: LoadingPageProperties;
  subtitle?: React.ReactNode | string;
  title?: string | React.ReactNode;
  toolbar?: React.ReactNode;
}

const Page: React.FC<PageProperties> = ({
  breadcrumb,
  children,
  className,
  centered = false,
  errorMessage,
  titleTag,
  loading = false,
  loadingComponent,
  loadingPageStyle,
  subtitle,
  title,
  toolbar,
  ...others
}) => {
  let child = null;
  let _className = "dz-page";

  if (loading) {
    child = loadingComponent ? (
      loadingComponent
    ) : (
      <LoadingPage {...loadingPageStyle} />
    );
  } else if (errorMessage) {
    child = (
      <div className="error" role="alert">
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (className) {
    _className += ` ${className}`;
  }

  return (
    <div className={_className} data-centered={centered}>
      <PageHeader {...{ title, titleTag, subtitle, toolbar, breadcrumb }} />
      <div data-testid="page-content" className="dz-page-content" {...others}>
        {child ? child : children}
      </div>
    </div>
  );
};

export default Page;
export type { PageProperties };
