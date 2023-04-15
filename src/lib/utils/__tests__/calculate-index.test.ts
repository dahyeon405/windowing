import { calculateRenderIndex, calculateStartIndex } from "..";

describe("calculateStartIndex", () => {
  const baseCondition = {
    top: 0,
    itemHeight: 30,
    curScrollPos: 0,
    viewportHeight: 500,
    itemCount: 5,
  };

  test("리스트가 아직 뷰포트 내로 들어오지 않은 경우", () => {
    // top > viewportHeight + curScrollPos
    const condition = { ...baseCondition, top: 600, curScrollPos: 90 };
    expect(calculateStartIndex(condition)).toBe(0);
  });

  test("리스트의 초기 위치가 뷰포트 내에 있는 경우", () => {
    // top < viewportHeight
    const condition = { ...baseCondition, top: 100, curScrollPos: 50 };
    expect(calculateStartIndex(condition)).toBe(0);
  });

  test("리스트의 초기 위치가 뷰포트 내에 있으며, 스크롤 된 경우", () => {
    // top < viewportHeight && top < curScrollPos
    const condition = { ...baseCondition, top: 400, curScrollPos: 460 };
    expect(calculateStartIndex(condition)).toBe(2);
  });

  test("리스트의 초기 위치가 뷰포트 내에 없으나, 스크롤 되어서 뷰포트 내로 들어온 경우", () => {
    // top > viewportHeight && top < curScrollPos + viewportHeight
    const condition_1 = { ...baseCondition, top: 700, curScrollPos: 300 };
    expect(calculateStartIndex(condition_1)).toBe(0);
    const condition_2 = { ...baseCondition, top: 700, curScrollPos: 1300 };
    expect(calculateStartIndex(condition_2)).toBe(3);
  });

  test("startIndex가 마지막 아이템 인덱스보다 커서는 안 됨", () => {
    const condition = { ...baseCondition, top: 0, curScrollPos: 1000 };
    expect(calculateStartIndex(condition)).toBe(4);
  });
});

describe("calculateRenderIndex", () => {
  const baseCondition = {
    top: 0,
    itemHeight: 100,
    curScrollPos: 0,
    viewportHeight: 500,
    itemCount: 10,
  };

  test("렌더링 시작, 끝 인덱스 계산", () => {
    const startIndex = calculateStartIndex(baseCondition);

    expect(calculateRenderIndex({ ...baseCondition, overscanCount: 1 })).toEqual({
      renderStartIndex: startIndex,
      renderEndIndex: 7,
    });
  });

  test("렌더링 끝 인덱스가 총 아이템 길이보다 크거나 같으면 안 됨", () => {
    const condition = { ...baseCondition, viewportHeight: 2000 };
    const startIndex = calculateStartIndex(condition);

    expect(calculateRenderIndex({ ...condition, overscanCount: 1 })).toEqual({
      renderStartIndex: startIndex,
      renderEndIndex: 9,
    });
  });
});
