interface CalculateStartIndex {
  top: number;
  itemHeight: number;
  curScrollPos: number;
  viewportHeight: number;
  itemCount: number;
}

interface CalculateRenderIndex extends CalculateStartIndex {
  overscanCount?: number;
}

export const calculateStartIndex = ({
  top,
  itemHeight,
  curScrollPos,
  viewportHeight,
  itemCount,
}: CalculateStartIndex): number => {
  if (top < viewportHeight) {
    if (curScrollPos < top) return 0;
    return Math.min(itemCount - 1, Math.floor((curScrollPos - top) / itemHeight));
  } else {
    if (curScrollPos < top + viewportHeight) return 0;
    return Math.min(itemCount - 1, Math.floor((curScrollPos - (viewportHeight + top)) / itemHeight));
  }
};

export const calculateRenderIndex = ({
  top,
  itemHeight,
  curScrollPos,
  viewportHeight,
  itemCount,
  overscanCount = 1,
}: CalculateRenderIndex) => {
  if (overscanCount < 1) overscanCount = 1;
  const startIndex = calculateStartIndex({ top, itemHeight, curScrollPos, viewportHeight, itemCount });
  const renderItemCount = Math.ceil(viewportHeight / itemHeight) + 1;
  const renderStartIndex = Math.max(0, startIndex - overscanCount);
  const renderEndIndex = Math.min(startIndex + renderItemCount + overscanCount, itemCount - 1);
  return {
    renderStartIndex,
    renderEndIndex,
  };
};
