import type { FC, ReactNode } from "react";

import { useState } from "react";

export interface SortableListProperties {
  className?: string;
  grabHandleIcon?: ReactNode;
  itemClassName?: string;
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (data: any) => ReactNode;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSort?: (sortedItems: { data: any; id: number }[]) => void;
}

export const SortableList: FC<SortableListProperties> = ({
  className = "",
  grabHandleIcon,
  itemClassName = "",
  items,
  onSort,
}) => {
  const [sortedItems, setSortedItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState<null | number>(null);
  const [droppedOver, setDroppedOver] = useState<number>(-1);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (droppedOver: number) => {
    setDroppedOver(droppedOver);
  };

  const handleDragEnd = () => {
    if (draggedItem !== null && draggedItem !== droppedOver) {
      const updatedItems = [...sortedItems];

      const [movedItem] = updatedItems.splice(draggedItem, 1);

      updatedItems.splice(droppedOver, 0, movedItem);

      setSortedItems(updatedItems);
      onSort && onSort(updatedItems);
      setDraggedItem(droppedOver);
    }

    setDraggedItem(null);
    setDroppedOver(-1);
  };

  const getDragDirection = (index: number) => {
    if (droppedOver === index && draggedItem !== null) {
      if (draggedItem > droppedOver) {
        return "up";
      }

      if (droppedOver > draggedItem) {
        return "down";
      }
    }
  };

  return (
    <ul className={`dz-sortable-list ${className}`.trimEnd()}>
      {sortedItems.map((item, index) => (
        <li
          className={`${itemClassName} ${
            draggedItem === index ? "dragged-item" : ""
          }`.trim()}
          data-drag-direction={getDragDirection(index)}
          draggable
          key={item.id}
          onDragEnd={handleDragEnd}
          onDragOver={() => handleDragOver(index)}
          onDragStart={() => handleDragStart(index)}
        >
          {grabHandleIcon ? (
            grabHandleIcon
          ) : (
            <span className="grab-icon">
              <i className="pi pi-ellipsis-v" />
              <i className="pi pi-ellipsis-v" />
            </span>
          )}
          <div>{item.render ? item.render(item.data) : item.data}</div>
        </li>
      ))}
    </ul>
  );
};
