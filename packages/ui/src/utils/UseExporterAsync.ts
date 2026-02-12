import saveAs from "file-saver";
import { WorkSheetOptions } from "node-xlsx";
import { useCallback, useState } from "react";

type UseExporterOptions = {
  filename?: string;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  onExportStart?: () => void;
  onExportEnd?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TriggerExportAsyncType = (data: any) => Promise<void>;

const exportXLSX = async ({
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
  const XLSX = await import("node-xlsx");

  const buffer = XLSX.build([{ name: sheetName, data, options: sheetOptions }]);

  saveAs(
    new Blob([buffer as unknown as BlobPart], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`,
  );
};

export const useExporterAsync = ({
  filename = `export_${Date.now()}.xlsx`,
  sheetName = "Sheet 1",
  sheetOptions = {},
  onExportStart,
  onExportEnd,
}: UseExporterOptions): [boolean, TriggerExportAsyncType] => {
  const [exporting, setExporting] = useState(false);

  const triggerExportAsync = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      await exportXLSX({ sheetName, filename, data, sheetOptions });

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd],
  );

  return [exporting, triggerExportAsync];
};
