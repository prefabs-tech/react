import { FileAttachBasic } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Tooltip } from "@prefabs.tech/react-ui";
import { useRef, useState } from "react";

import type { FileExtended } from "@prefabs.tech/react-form";

export const FileAttachDemo = () => {
  const { t } = useTranslation("files");
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const reference = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FileAttachBasic
        name="fileAttach"
        selectButtonProps={{ iconLeft: "pi pi-file" }}
        value={selectedFiles}
        mode={"update"}
        multiple={true}
        onChange={(file: FileExtended[]) => {
          setSelectedFiles(file);
        }}
        selectedFileDisplay="none"
      />

      {selectedFiles.map((file: FileExtended, i) => {
        return (
          <div key={file.name} className="attached-file">
            <span>{file.name}</span>
            <Tooltip
              elementRef={reference}
              position="top"
              offset={10}
              delay={200}
            >
              <span>{t("fileAttach.deleteFileMessage")}</span>
            </Tooltip>
            <button
              onClick={() => {
                setSelectedFiles((pre) =>
                  pre.filter((file, index) => i !== index),
                );
              }}
              ref={reference}
            >
              X
            </button>
          </div>
        );
      })}
    </>
  );
};
