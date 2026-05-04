import React, { useCallback, useEffect, useState } from "react";

import { Button, DebouncedInput } from "..";

export interface PaginationProperties {
  className?: string;
  currentPage: number;
  defaultItemsPerPage?: number;
  inputDebounceTime?: number;
  itemsPerPageControlLabel?: string;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  onPageChange: (page: number) => void;
  pageInputLabel?: string;
  showFirstLastButtons?: boolean;
  showItemsPerPageControl?: boolean;
  showPageButtons?: boolean;
  showPageInput?: boolean;
  showPreviousNextButtons?: boolean;
  totalItems: number;
}

export const Pagination: React.FC<PaginationProperties> = ({
  className,
  currentPage,
  itemsPerPageOptions = [5, 10, 20, 30],
  defaultItemsPerPage = itemsPerPageOptions[0],
  inputDebounceTime,
  itemsPerPageControlLabel = "Items per page",
  onItemsPerPageChange,
  onPageChange,
  pageInputLabel = "Go to page:",
  showFirstLastButtons = true,
  showItemsPerPageControl = true,
  showPageButtons = false,
  showPageInput = false,
  showPreviousNextButtons = true,
  totalItems,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);

  useEffect(() => {
    setItemsPerPage(defaultItemsPerPage);
  }, [defaultItemsPerPage]);

  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    onItemsPerPageChange && onItemsPerPageChange(newItemsPerPage);
  };

  const handlePageInputChange = useCallback(
    (value: number | readonly string[] | string) => {
      const newPage = parseInt(value.toString(), 10) - 1;

      if (!isNaN(newPage) && newPage >= 0 && newPage < lastPage) {
        onPageChange(newPage);
      }
    },
    [lastPage, onPageChange],
  );

  const pageStatics = <span> {`${currentPage + 1} / ${lastPage}`}</span>;

  return (
    <div className={`pagination ${className || ""}`}>
      {showItemsPerPageControl && (
        <div className="items-per-page-control">
          <span>{itemsPerPageControlLabel}</span>
          <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {lastPage > 1 && showPageInput && (
        <div className="page-input-control">
          <span>{pageInputLabel}</span>
          <DebouncedInput
            debounceTime={inputDebounceTime}
            onInputChange={handlePageInputChange}
            type="number"
          />
        </div>
      )}
      {lastPage > 1 ? (
        <div className="pagination-buttons-wrapper">
          {showFirstLastButtons || showPreviousNextButtons ? (
            <div>
              {showFirstLastButtons && (
                <Button
                  className="first-page"
                  disabled={!(currentPage > 0)}
                  iconLeft={<i className="pi pi-angle-double-left" />}
                  onClick={() => onPageChange(0)}
                  size="small"
                />
              )}

              {showPreviousNextButtons && (
                <Button
                  className="previous-page"
                  disabled={!(currentPage > 0)}
                  iconLeft={<i className="pi pi-angle-left" />}
                  onClick={() => onPageChange(currentPage - 1)}
                  size="small"
                />
              )}
            </div>
          ) : null}

          <div>
            {showPageButtons
              ? pages.map((page) => (
                  <Button
                    className={`page-button ${
                      page === currentPage + 1 ? "active" : ""
                    }`}
                    key={page}
                    label={`${page}`}
                    onClick={() => onPageChange(page - 1)}
                    size="small"
                    variant={page === currentPage + 1 ? "filled" : "outlined"}
                  />
                ))
              : pageStatics}
          </div>

          {showFirstLastButtons || showPreviousNextButtons ? (
            <div>
              {showPreviousNextButtons && (
                <Button
                  className="next-page"
                  disabled={!(currentPage < lastPage - 1)}
                  iconLeft={<i className="pi pi-angle-right" />}
                  onClick={() => onPageChange(currentPage + 1)}
                  size="small"
                />
              )}

              {showFirstLastButtons && (
                <Button
                  className="last-page"
                  disabled={!(currentPage < lastPage - 1)}
                  iconLeft={<i className="pi pi-angle-double-right" />}
                  onClick={() => onPageChange(lastPage - 1)}
                  size="small"
                />
              )}
            </div>
          ) : null}
        </div>
      ) : (
        pageStatics
      )}
    </div>
  );
};
