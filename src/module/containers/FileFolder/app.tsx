import React, { useState } from "react";
import { FileList } from "./FileList.tsx";
import { useTraverseTree } from "./useTraverseTree.ts";
import { useGetData } from "./useGetData.ts";

export default function FileFolder() {
  const { data, loading, setData } = useGetData();
  const [search, setSearch] = useState("");
  const [isFolder, setFolderStatus] = useState(false);
  const { insertNode, deleteNode, renameNode, makeFolder } = useTraverseTree();

  const onChange = (event: any) => {
    const value = event.target.value;
    setSearch(value);
  };
  const insertNodeHandler = ({ ...params }) => {
    if (search.length) {
      const updatedData = insertNode({
        ...(params as any),
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
    const updatedData = deleteNode({ ...(params as any), tree: data });
    setData(updatedData);
  };
  const renameNodeHandler = ({ ...params }) => {
    const updatedData = renameNode({ ...(params as any), tree: data });
    setData(updatedData);
  };

  const makeFolderHandler = ({ ...params }) => {
    const updatedData = makeFolder({ ...(params as any), tree: data });
    setData(updatedData);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid black ",
        backgroundColor: "gray",
        margin: "10px",
        padding: "10px",
        alignSelf: "center",
        width: "100%",
        height: "100%",
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
          // width: "50vw",
          // height: "100%",
        }}
      >
        {loading ? (
          <text>Loading File Structure...</text>
        ) : (
          <FileList
            data={data ?? []}
            insertNode={insertNodeHandler}
            deleteNode={deleteNodeHandler}
            renameNode={renameNodeHandler}
            makeFolder={makeFolderHandler}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "start",
          borderRadius: "10px",
          border: "2px solid",
          padding: "10px",
          // width: "40vw",
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
