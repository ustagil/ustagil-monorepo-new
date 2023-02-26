const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function makeData<T>(newData: (index: number) => T, ...lens: number[]) {
  const makeDataLevel = (depth = 0): T[] => {
    const len = lens[depth]!;
    return range(len).map((_, i): T => {
      return {
        ...newData(i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
