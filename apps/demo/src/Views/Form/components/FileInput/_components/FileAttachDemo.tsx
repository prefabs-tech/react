import type { FileExtended } from "@prefabs.tech/react-form";

import { FileAttachBasic } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Tooltip } from "@prefabs.tech/react-ui";
import { useRef, useState } from "react";

export const FileAttachDemo = () => {
  const { t } = useTranslation("files");
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const reference = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FileAttachBasic
        mode={"update"}
        multiple={true}
        name="fileAttach"
        onChange={(file: FileExtended[]) => {
          setSelectedFiles(file);
        }}
        selectButtonProps={{ iconLeft: "pi pi-file" }}
        selectedFileDisplay="none"
        value={selectedFiles}
      />

      {selectedFiles.map((file: FileExtended, i) => {
        return (
          <div className="attached-file" key={file.name}>
            <span>{file.name}</span>
            <Tooltip
              delay={200}
              elementRef={reference}
              offset={10}
              position="top"
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
