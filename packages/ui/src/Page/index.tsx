import { DetailedHTMLProps, HTMLAttributes } from "react";

import { PageHeader } from "./Header";
import LoadingPage, { LoadingPageProperties } from "../LoadingPage";

import type { ToolbarActionsMenuProperties } from "./ToolbarActions";

interface PageProperties
  extends Pick<
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
  title?: string | React.ReactNode;
  titleTag?: string | React.ReactNode;
  toolbarActionMenu?: ToolbarActionsMenuProperties;
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
  toolbarActionMenu,
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
      <PageHeader
        {...{
          breadcrumb,
          subtitle,
          title,
          titleTag,
          toolbar,
          toolbarActionMenu,
        }}
      />
      <div data-testid="page-content" className="dz-page-content" {...others}>
        {child ? child : children}
      </div>
    </div>
  );
};

export default Page;
export type { PageProperties };
