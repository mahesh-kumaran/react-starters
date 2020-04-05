import _ from "lodash";

export default function paginate(items, pageSize, currentPage) {
  const startIndex = (pageSize - 1) * currentPage;
  return _(items).slice(startIndex).take(pageSize).value();
}
