export function filterType(tree, type){
    return tree
      .filter((item) => {
        return item.type !== type;
      })
      .map((item) => {
        item = Object.assign({}, item);
        if (item.children) {
          item.children = filterType(item.children, type);
        }
        return item;
      });
  }
export function getItemByNameInTree(name, tree) {
  let res = null;
  for (let i = 0; i < tree.length; i++) {
    let ele = tree[i];
    ele.title === name ? (res = ele) : "";
    if (res) break;
    if (ele.children) {
      res = getItemByNameInTree(name, ele.children);
    }
  }
  return res;
}