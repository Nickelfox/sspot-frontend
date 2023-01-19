import * as sorters from "../sorters"

it("merge sorts based on compare func", () => {
  const list = [5, 3, 4, 1, 2]
  const output = sorters.mergeSort(list, (a, b) => a < b)
  expect(output).toStrictEqual([1, 2, 3, 4, 5])
})
