import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableSectionProps {
  id: string;
  children: React.ReactNode;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 999 : undefined,
    transition: isDragging ? "none" : "transform 0.2s ease",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab"
    >
      {children}
    </div>
  );
};

export default DraggableSection;
