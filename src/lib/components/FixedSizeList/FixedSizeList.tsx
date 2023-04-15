import React, { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useScrollDetector, useViewportHeight } from "../../hooks";
import { calculateRenderIndex } from "../../utils";

interface FixedSizeListProps {
  scrollTarget: HTMLElement | Window;
  top: number;
  itemHeight: number;
  children: React.ReactElement;
  itemData: Array<any>;
  itemCount: number;
  overscanCount?: number;
  style: CSSProperties;
}

export default function FixedSizeList({
  scrollTarget = window,
  top,
  itemHeight,
  children,
  itemData,
  overscanCount = 1,
  style,
}: FixedSizeListProps) {
  const curScrollPos = useScrollDetector(scrollTarget);
  const viewportHeight = useViewportHeight();

  const itemCount = itemData.length;
  const [renderIndex, setRenderIndex] = useState({
    renderStartIndex: 0,
    renderEndIndex: itemCount,
  });
  const [indexOffset, setIndexOffset] = useState(0);
  const [renderItem, setRenderItem] = useState<Array<any>>([]);

  useEffect(() => {
    if (viewportHeight === 0) return;
    const newRenderIndex = calculateRenderIndex({
      top,
      itemHeight,
      curScrollPos,
      viewportHeight,
      itemCount,
      overscanCount,
    });
    if (JSON.stringify(renderIndex) !== JSON.stringify(newRenderIndex)) setRenderIndex(newRenderIndex);
  }, [curScrollPos, viewportHeight]);

  useEffect(() => {
    const { renderStartIndex, renderEndIndex } = renderIndex;
    setIndexOffset(renderStartIndex);
    setRenderItem(itemData.slice(renderStartIndex, renderEndIndex + 1));
  }, [renderIndex]);

  return (
    <div style={style}>
      <div style={{ position: "relative", height: `${itemCount * itemHeight}px` }}>
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
