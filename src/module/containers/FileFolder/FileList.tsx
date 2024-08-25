import React, { useEffect, useState } from "react";

export const FileList = ({
  data,
  insertNode,
  deleteNode,
  renameNode,
  makeFolder,
}: {
  data: any;
  insertNode: any;
  deleteNode: any;
  renameNode: any;
  makeFolder: any;
}) => {
  return (
    <div
      style={{
        marginLeft: "20px",
      }}
    >
      {data.map((item: any) => {
        return (
          <FileFolder
            item={item}
            insertNode={insertNode}
            deleteNode={deleteNode}
            renameNode={renameNode}
            makeFolder={makeFolder}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

const FileFolder = ({
  item,
  insertNode,
  deleteNode,
  renameNode,
  makeFolder,
}: {
  item: any;
  insertNode: any;
  deleteNode: any;
  renameNode: any;
  makeFolder: any;
}) => {
  const [isFolderOpen, setFolderOpenStatus] = useState(item.isOpen);
  const [rename, setRename] = useState({ value: "", isVisible: false });
  useEffect(() => {
    setFolderOpenStatus(item.isOpen);
  }, [item]);
  const renameHandler = () => {
    setRename(() => ({ value: item.name, isVisible: true }));
  };
  const isFolder = Boolean(item.files);
  return (
    <div
      style={{
        margin: "5px",
        textAlign: "start",
      }}
    >
      {isFolder ? (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="folder.png" alt="FOLDER" height={15} width={15} />
            {rename.isVisible ? (
              <input
                value={rename.value}
                onChange={(e) => {
                  const value = e.target.value;
                  setRename((prev) => ({ ...prev, value }));
                }}
              />
            ) : (
              <text
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => setFolderOpenStatus((prev: any) => !prev)}
              >
                {item.name}
              </text>
            )}
            <button
              onClick={() => insertNode({ folderId: item.id, isFolder })}
              style={{ marginLeft: "10px" }}
            >
              + Add Folder / File Here
            </button>
            <button
              onClick={() => {
                if (rename.isVisible) {
                  if (rename.value.length) {
                    renameNode({ folderId: item.id, newName: rename.value });
                    setRename({ value: "", isVisible: false });
                  } else {
                    alert("Please specify valid name or discard editing");
                  }
                } else {
                  renameHandler();
                }
              }}
              style={{ marginLeft: "10px" }}
            >
              {rename.isVisible ? "Save" : "Rename Folder"}
            </button>
            {rename.isVisible ? (
              <button
                onClick={() => {
                  setRename({ isVisible: false, value: "" });
                }}
              >
                Discard Editing
              </button>
            ) : null}
            <button
              onClick={() => deleteNode({ folderId: item.id })}
              style={{ marginLeft: "10px" }}
            >
              Delete Folder
            </button>
          </div>
          {isFolderOpen ? (
            <FileList
              data={item.files}
              insertNode={insertNode}
              deleteNode={deleteNode}
              renameNode={renameNode}
              makeFolder={makeFolder}
            />
          ) : null}
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="document.png" alt="FILE" height={15} width={15} />
            {rename.isVisible ? (
              <input
                value={rename.value}
                onChange={(e) => {
                  const value = e.target.value;
                  setRename((prev) => ({ ...prev, value }));
                }}
              />
            ) : (
              <text>{item.name}</text>
            )}
            <button
              onClick={() => makeFolder({ folderId: item.id })}
              style={{ marginLeft: "10px" }}
            >
              Convert To Folder
            </button>
            <button
              onClick={() => {
                if (rename.isVisible) {
                  if (rename.value.length) {
                    renameNode({ folderId: item.id, newName: rename.value });
                    setRename({ value: "", isVisible: false });
                  } else {
                    alert("Please specify valid name or discard editing");
                  }
                } else {
                  renameHandler();
                }
              }}
              style={{ marginLeft: "10px" }}
            >
              {rename.isVisible ? "Save" : "Rename File"}
            </button>
            {rename.isVisible ? (
              <button
                onClick={() => {
                  setRename({ isVisible: false, value: "" });
                }}
              >
                Discard Editing
              </button>
            ) : null}
            <button
              onClick={() => deleteNode({ folderId: item.id })}
              style={{ marginLeft: "10px" }}
            >
              Delete File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
