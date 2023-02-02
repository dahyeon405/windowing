import React, { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { RefObject } from "react";
import useScrollDetector from "../useScrollDetector";
import useViewportHeight from "../useViewportSize";
import { calculateStartIndex, calculateRenderIndex } from "../utils";

interface FixedSizeListProps {
  scrollTarget: RefObject<any>;
  top: number;
  itemHeight: number;
  children: React.ReactElement;
  itemData: Array<any>;
  itemCount: number;
  overscanCount?: number;
  style: CSSProperties;
}

export default function FixedSizeList({
  scrollTarget,
  top,
  itemHeight,
  children,
  itemData,
  overscanCount = 1,
  style,
}: FixedSizeListProps) {
  const curScrollPos = useScrollDetector(scrollTarget);
  const viewportSize = useViewportHeight();
  const [renderIndex, setRenderIndex] = useState({
    renderStartIndex: 0,
    renderEndIndex: itemData.length,
  });
  const [indexOffset, setIndexOffset] = useState(0);
  const [renderItem, setRenderItem] = useState<Array<any>>([]);

  useEffect(() => {
    if (viewportSize === 0) return;
    const renderItemCount = Math.ceil(viewportSize / itemHeight) + 1;
    const startIndex = calculateStartIndex({ top, itemHeight, curScrollPos, viewportSize });
    const newRenderIndex = calculateRenderIndex({
      startIndex,
      renderItemCount,
      itemCount: itemData.length,
      overscanCount,
    });
    if (JSON.stringify(renderIndex) !== JSON.stringify(newRenderIndex)) setRenderIndex(newRenderIndex);
  }, [curScrollPos, viewportSize]);

  useEffect(() => {
    const { renderStartIndex, renderEndIndex } = renderIndex;
    setIndexOffset(renderStartIndex);
    setRenderItem(itemData.slice(renderStartIndex, renderEndIndex));
  }, [renderIndex]);

  return (
    <div style={style}>
      <div style={{ position: "relative", height: `${itemData.length * itemHeight}px` }}>
        {renderItem.map((data, index) => {
          const realIndex = indexOffset + index;
          const calculatedTop = realIndex * itemHeight;
          return React.createElement(
            "div",
            {
              key: realIndex,
              style: { height: `${itemHeight}px`, width: "100%", top: `${calculatedTop}px`, position: "absolute" },
            },
            React.cloneElement(children, {
              data: data,
              index: realIndex,
            })
          );
        })}
      </div>
    </div>
  );
}
