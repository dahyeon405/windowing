interface calculateStartIndexProps {
  top: number;
  itemHeight: number;
  curScrollPos: number;
  viewportSize: number;
}

interface calculateRenderIndexProps {
  startIndex: number;
  renderItemCount: number;
  itemCount: number;
  overscanCount?: number;
}

export const calculateStartIndex = ({
  top,
  itemHeight,
  curScrollPos,
  viewportSize,
}: calculateStartIndexProps): number => {
  if (top < viewportSize) {
    const startIndex = Math.floor((curScrollPos - top) / itemHeight);
    return startIndex;
  } else {
    if (curScrollPos < viewportSize + top) return 0;
    const startIndex = Math.floor((curScrollPos - (viewportSize + top)) / itemHeight);
    return startIndex;
  }
};

export const calculateRenderIndex = ({
  startIndex,
  renderItemCount,
  itemCount,
  overscanCount,
}: calculateRenderIndexProps) => {
  if (!overscanCount || overscanCount < 1) overscanCount = 1;
  const renderStartIndex = Math.max(0, startIndex - overscanCount);
  const renderEndIndex = Math.min(startIndex + renderItemCount + overscanCount, itemCount);
  return {
    renderStartIndex,
    renderEndIndex,
  };
};
