export const useTraverseTree = () => {
  const insertNode = ({ tree, folderId, name, isFolder }) => {
    if (tree?.id === folderId) {
      if (isFolder) {
        tree.files.push({
          name,
          isOpen: false,
          files: [
            { name: "default.txt", id: new Date().getTime() * Math.random() },
          ],
          id: new Date().getTime() * Math.random(),
        });
      } else {
        tree.files.push({ name, id: new Date().getTime() });
      }
      return { ...tree, isOpen: true };
    }

    if (tree?.files) {
      tree.files = tree.files.map((obj) =>
        insertNode({ tree: obj, folderId, name, isFolder })
      );
    } else if (Array.isArray(tree)) {
      tree = tree.map((obj) =>
        insertNode({ tree: obj, folderId, name, isFolder })
      );
    }
    return tree;
  };
  const deleteNode = ({ tree, folderId }) => {
    if (tree?.id === folderId) {
      return false;
    }

    if (tree?.files) {
      tree.files = tree.files.filter((obj) =>
        deleteNode({ tree: obj, folderId })
      );
    } else if (Array.isArray(tree)) {
      tree = tree.filter((obj) => deleteNode({ tree: obj, folderId }));
    }
    return tree;
  };
  const renameNode = ({ tree, folderId, newName }) => {
    if (tree?.id === folderId) {
      tree.name = newName;
      return tree;
    }

    if (tree?.files) {
      tree.files = tree.files.map((obj) =>
        renameNode({ tree: obj, folderId, newName })
      );
    } else if (Array.isArray(tree)) {
      tree = tree.filter((obj) => renameNode({ tree: obj, folderId, newName }));
    }
    return tree;
  };
  const makeFolder = ({ tree, folderId }) => {
    if (tree?.id === folderId) {
      tree.files = [{ name: "default.txt", id: new Date().getTime() }];
      tree.isOpen = true;
      return tree;
    }

    if (tree?.files) {
      tree.files = tree.files.map((obj) => makeFolder({ tree: obj, folderId }));
    } else if (Array.isArray(tree)) {
      tree = tree.filter((obj) => makeFolder({ tree: obj, folderId }));
    }
    return tree;
  };
  return {
    insertNode,
    deleteNode,
    renameNode,
    makeFolder,
  };
};
