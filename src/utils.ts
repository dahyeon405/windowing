export const calculateStartIndex = ({ top, itemHeight, curScrollPos, viewportSize }): number => {
  if (top < viewportSize) {
    const startIndex = Math.floor((curScrollPos - top) / itemHeight);
    return startIndex;
  } else {
    if (curScrollPos < viewportSize + top) return 0;
    const startIndex = Math.floor((curScrollPos - (viewportSize + top)) / itemHeight);
    return startIndex;
  }
};

export const calculateRenderIndex = ({ startIndex, renderItemCount, itemCount, overscanCount }) => {
  if (!overscanCount || overscanCount < 1) overscanCount = 1;
  const renderStartIndex = Math.max(0, startIndex - overscanCount);
  const renderEndIndex = Math.min(startIndex + renderItemCount + overscanCount, itemCount);
  return {
    renderStartIndex,
    renderEndIndex,
  };
};
