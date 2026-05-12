import saveAs from "file-saver";
import { build, WorkSheetOptions } from "node-xlsx";
import { useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TriggerExportType = (data: any) => void;

type UseExporterOptions = {
  filename?: string;
  onExportEnd?: () => void;
  onExportStart?: () => void;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
};

const exportXLSX = ({
  data,
  filename,
  sheetName,
  sheetOptions,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  filename: string;
  sheetName: string;
  sheetOptions: WorkSheetOptions;
}) => {
  const buffer = build([{ data, name: sheetName, options: sheetOptions }]);

  saveAs(
    new Blob([buffer as BlobPart], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`,
  );
};

export const useExporter = ({
  filename = `export_${Date.now()}.xlsx`,
  onExportEnd,
  onExportStart,
  sheetName = "Sheet 1",
  sheetOptions = {},
}: UseExporterOptions): [boolean, TriggerExportType] => {
  const [exporting, setExporting] = useState(false);

  const triggerExport = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      exportXLSX({ data, filename, sheetName, sheetOptions });

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd],
  );

  return [exporting, triggerExport];
};
