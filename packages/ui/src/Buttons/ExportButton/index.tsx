import { WorkSheetOptions } from "node-xlsx";
import React, { ComponentProps, useCallback } from "react";

import LoadingIcon from "../../LoadingIcon";
import { useExporter } from "../../utils";
import { Button } from "../ButtonBasic";

export interface ExportButtonProperties extends ComponentProps<typeof Button> {
  filename?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData: () => Array<Array<any>>;
  onExportEnd?: () => void;
  onExportStart?: () => void;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
}

export const ExportButton: React.FC<ExportButtonProperties> = ({
  filename,
  getData,
  label = "Export XLSX",
  onExportEnd,
  onExportStart,
  sheetName,
  sheetOptions,
  ...buttonOptions
}) => {
  const [exporting, triggerExport] = useExporter({
    filename,
    onExportEnd,
    onExportStart,
    sheetName,
    sheetOptions,
  });

  const onExportButtonClick = useCallback(() => {
    const data = getData();
    triggerExport(data);
  }, [triggerExport, getData]);

  return (
    <Button
      disabled={exporting}
      iconRight={exporting && <LoadingIcon />}
      label={label}
      onClick={onExportButtonClick}
      {...buttonOptions}
    />
  );
};
