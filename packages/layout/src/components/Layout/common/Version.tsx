import useConfig from "@/hooks/useConfig";

interface Properties {
  children?: React.ReactNode;
  version?: string;
}

export const Version = ({ children, version }: Properties) => {
  const appConfig = useConfig();

  const _version = version || appConfig?.appVersion || "[App version]";

  return <div className="dz-version">{children || _version}</div>;
};
