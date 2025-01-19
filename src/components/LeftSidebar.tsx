import { Heading } from "@/components/typography/heading";
import { questionTypes } from "@/lib/utils";
import React, { useCallback } from "react";
function LeftSidebar() {
  const handleDragStart = useCallback(
    (e: React.DragEvent, category: string) => {
      e.dataTransfer.setData("text/plain", category);
    },
    []
  );
  return (
    <div className="col-span-1 max-lg:hidden max-md:hidden h-full w-full flex p-4 items-start justify-start flex-col gap-4">
      <Heading size="tiny" className="px-1 font-semibold">
        Drag-Drop Types ⚡️
      </Heading>
      {questionTypes.map((item) => (
        <div
          onDragStart={(e) => handleDragStart(e, item.category)}
          draggable
          key={item.category}
          className="p-2 shadow-xs hover:bg-peerlistHoverBackground w-full border gap-3 rounded-lg flex items-center"
        >
          {item.icon}
          <div>
            <Heading className="text-sm font-semibold">{item.label}</Heading>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeftSidebar;
