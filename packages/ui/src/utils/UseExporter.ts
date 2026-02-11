import saveAs from "file-saver";
import { build, WorkSheetOptions } from "node-xlsx";
import { useCallback, useState } from "react";

type UseExporterOptions = {
  filename?: string;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  onExportStart?: () => void;
  onExportEnd?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TriggerExportType = (data: any) => void;

const exportXLSX = ({
  sheetName,
  filename,
  data,
  sheetOptions,
}: {
  sheetName: string;
  filename: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  sheetOptions: WorkSheetOptions;
}) => {
  const buffer = build([{ name: sheetName, data, options: sheetOptions }]);

  saveAs(
    new Blob([buffer as unknown as BlobPart], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`,
  );
};

export const useExporter = ({
  filename = `export_${Date.now()}.xlsx`,
  sheetName = "Sheet 1",
  sheetOptions = {},
  onExportStart,
  onExportEnd,
}: UseExporterOptions): [boolean, TriggerExportType] => {
  const [exporting, setExporting] = useState(false);

  const triggerExport = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      exportXLSX({ sheetName, filename, data, sheetOptions });

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd],
  );

  return [exporting, triggerExport];
};
