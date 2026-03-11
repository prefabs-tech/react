import { WorkSheetOptions } from "node-xlsx";
import React, { ComponentProps, useCallback } from "react";

import LoadingIcon from "../../LoadingIcon";
import { useExporter } from "../../utils";
import { Button } from "../ButtonBasic";

export interface ExportButtonProperties extends ComponentProps<typeof Button> {
  filename?: string;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  onExportStart?: () => void;
  onExportEnd?: () => void;
  getData: () => Array<Array<unknown>>;
}

export const ExportButton: React.FC<ExportButtonProperties> = ({
  label = "Export XLSX",
  filename,
  sheetName,
  sheetOptions,
  getData,
  onExportStart,
  onExportEnd,
  ...buttonOptions
}) => {
  const [exporting, triggerExport] = useExporter({
    filename,
    sheetName,
    sheetOptions,
    onExportStart,
    onExportEnd,
  });

  const onExportButtonClick = useCallback(() => {
    const data = getData();
    triggerExport(data);
  }, [triggerExport, getData]);

  return (
    <Button
      label={label}
      disabled={exporting}
      iconRight={exporting && <LoadingIcon />}
      onClick={onExportButtonClick}
      {...buttonOptions}
    />
  );
};
