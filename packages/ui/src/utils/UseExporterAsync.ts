import saveAs from "file-saver";
import { WorkSheetOptions } from "node-xlsx";
import { useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TriggerExportAsyncType = (data: any) => Promise<void>;

type UseExporterOptions = {
  filename?: string;
  onExportEnd?: () => void;
  onExportStart?: () => void;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
};

const exportXLSX = async ({
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
  const XLSX = await import("node-xlsx");

  const buffer = XLSX.build([{ data, name: sheetName, options: sheetOptions }]);

  saveAs(
    new Blob([buffer as unknown as BlobPart], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`,
  );
};

export const useExporterAsync = ({
  filename = `export_${Date.now()}.xlsx`,
  onExportEnd,
  onExportStart,
  sheetName = "Sheet 1",
  sheetOptions = {},
}: UseExporterOptions): [boolean, TriggerExportAsyncType] => {
  const [exporting, setExporting] = useState(false);

  const triggerExportAsync = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      await exportXLSX({ data, filename, sheetName, sheetOptions });

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd],
  );

  return [exporting, triggerExportAsync];
};
