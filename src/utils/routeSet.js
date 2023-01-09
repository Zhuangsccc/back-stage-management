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

function getItemByPathInTree(path, tree) {
  let res = null;
  for (let i = 0; i < tree.length; i++) {
    let ele = tree[i];
    ele.path === path ? (res = ele) : "";
    if (res) break;
    if (ele.children) {
      res = getItemByPathInTree(path, ele.children);
    }
  }
  return res;
}

export function getOuterMostNode(path,tree){
    let node = null
    node = getItemByPathInTree(path,tree)
    if(node.Ppath){
      node = getOuterMostNode(node.Ppath,tree)
    }
    return node
}
export function filterPath(tree, path) {
  return tree
    .filter((item) => {
      return item.path !== path;
    })
    .map((item) => {
      item = Object.assign({}, item);
      if (item.children) {
        item.children = filterPath(item.children, path);
      }
      return item;
    });
}