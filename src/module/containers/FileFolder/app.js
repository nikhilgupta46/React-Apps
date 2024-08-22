import React, { useState } from "react";
import { FileList } from "./FileList.js";
import { useTraverseTree } from "./useTraverseTree.js";
import { useGetData } from "./useGetData.js";

export default function FileFolder() {
  const { data, loading, setData } = useGetData();
  const [search, setSearch] = useState("");
  const [isFolder, setFolderStatus] = useState(false);
  const { insertNode, deleteNode, renameNode, makeFolder } = useTraverseTree();

  const onChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const insertNodeHandler = ({ ...params }) => {
    if (search.length) {
      const updatedData = insertNode({
        ...params,
        isFolder,
        tree: data,
        name: search,
      });
      setData(updatedData);
      setSearch("");
    } else {
      alert("No file / folder value added. Please do so");
    }
  };
  const deleteNodeHandler = ({ ...params }) => {
    const updatedData = deleteNode({ ...params, tree: data });
    setData(updatedData);
  };
  const renameNodeHandler = ({ ...params }) => {
    const updatedData = renameNode({ ...params, tree: data });
    setData(updatedData);
  };

  const makeFolderHandler = ({ ...params }) => {
    const updatedData = makeFolder({ ...params, tree: data });
    setData(updatedData);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid black ",
        height: "100vw",
        width: "100vw",
        backgroundColor: "gray",
        margin: "10px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          borderRadius: "10px",
          border: "2px solid",
          overflowY: "auto",
          padding: "10px",
          width: "50vw",
          height: "100%",
        }}
      >
        {loading ? (
          <text>Loading File Structure...</text>
        ) : (
          <div style={{}}>
            <div style={{ marginBottom: "30px" }}>
              <text style={{ fontSize: "30px" }}>File structure</text>
            </div>
            <FileList
              data={data ?? []}
              insertNode={insertNodeHandler}
              deleteNode={deleteNodeHandler}
              renameNode={renameNodeHandler}
              makeFolder={makeFolderHandler}
            />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "start",
          borderRadius: "10px",
          border: "2px solid",
          padding: "10px",
          width: "40vw",
          marginLeft: "20px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <div
            style={
              isFolder
                ? {
                    border: `${"1px solid"}`,
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px",
                  }
                : {
                    margin: "10px",
                    padding: "10px",
                  }
            }
          >
            <button onClick={() => setFolderStatus(true)}>
              <text>Create Folder</text>
            </button>
          </div>
          <div
            style={
              isFolder
                ? {
                    margin: "10px",
                    padding: "10px",
                  }
                : {
                    border: `${"1px solid"}`,
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "10px",
                  }
            }
          >
            <button onClick={() => setFolderStatus(false)}>
              <text>Create File</text>
            </button>
          </div>
        </div>
        <div style={{ margin: "10px", width: "100%" }}>
          <input
            style={{
              padding: "10px",
              borderRadius: "10px",
              fontSize: "15px",
            }}
            onChange={onChange}
            value={search}
            placeholder="Add File Name"
          ></input>
        </div>
      </div>
    </div>
  );
}
