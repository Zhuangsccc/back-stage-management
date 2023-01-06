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