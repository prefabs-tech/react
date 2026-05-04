import { DetailedHTMLProps, HTMLAttributes } from "react";

import LoadingPage, { LoadingPageProperties } from "../LoadingPage";
import { PageHeader } from "./Header";

interface PageProperties extends Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "aria-orientation"
> {
  breadcrumb?: React.ReactNode;
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  loadingPageStyle?: LoadingPageProperties;
  subtitle?: React.ReactNode | string;
  title?: React.ReactNode | string;
  titleTag?: React.ReactNode | string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<PageProperties> = ({
  breadcrumb,
  centered = false,
  children,
  className,
  errorMessage,
  loading = false,
  loadingComponent,
  loadingPageStyle,
  subtitle,
  title,
  titleTag,
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
      <PageHeader {...{ breadcrumb, subtitle, title, titleTag, toolbar }} />
      <div className="dz-page-content" data-testid="page-content" {...others}>
        {child ? child : children}
      </div>
    </div>
  );
};

export default Page;
export type { PageProperties };
