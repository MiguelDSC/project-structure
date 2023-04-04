import React, { useState } from "react";
import { Button } from "@foleon/atomic";
import dummyFolderList, { FolderItemType } from "../folder/DummyFolderList";

type CreateFolderModalProps = {
  activedModal: () => void;
  onCancelHandler: () => void;
  onSubmitFormHandler: (name: FolderItemType) => void;
};

export default function CreateFolderModal(props: CreateFolderModalProps) {
  const [name, setName] = useState("");

  const onlySpaces = (str: string) => {
    return /^\s*$/.test(str);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (onlySpaces(name)) return;

    //find parent
    const parentFolder = dummyFolderList.find(
      (folder) => folder.path === location.pathname
    );

    //create temp folder
    let newFolder: FolderItemType = {
      id: Math.round(Math.random() * 1000),
      folderName: name,
      path: location.pathname + name.split(" ").join(""),
      childeren: [],
    };

    //set parent id
    if (parentFolder != undefined) {
      newFolder.parent = parentFolder.id;
      parentFolder.childeren?.push(newFolder.id);
    }

    //set path
    if (location.pathname === "/") {
      newFolder.path = "/" + name.split(" ").join("");
    } else {
      newFolder.path = location.pathname + "/" + name.split(" ").join("");
    }

    //checks if limit is reached
    if (newFolder?.path.split("/").filter((a) => a.length > 0).length >= 3) {
      props.activedModal();
      props.onCancelHandler();
      return;
    }

    props.onSubmitFormHandler(newFolder);
  };

  const nameChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex justify-center z-20 m-auto">
        <div
          style={{
            backgroundColor: "white",
            left: "calc(100% / 3)",
            top: "calc(100% / 3)",
          }}
          className="font-thin ring-1 ring-black fixed rounded-md shadow-xl bg-slate-600 w-1/3 h-1/3"
        >
          <p className="text-center text-2xl pt-4">Name your folder</p>
          <p className="text-center text-sm ">
            The name can't include: spaces, / and \
          </p>
          <div className="p-6">
            <form className="grid" onSubmit={submitHandler}>
              <label>Name: </label>
              <input
                type="text"
                required
                maxLength={12}
                className="rounded-md border border-gray-400"
                onChange={nameChangeHandler}
                pattern="^[^\\/]*$"
                autoFocus
                onKeyDown={(event) => {
                  if (
                    event.key === "/" ||
                    event.key === "." ||
                    event.key === "\\" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                  }
                }}
              ></input>
              <span className="grid grid-cols-2 gap-4 p-6 font-thin">
                <button
                  className={
                    "bg-transparent hover:bg-blue-400 text-foleon-blue hover:text-white py-2 px-4 border border-foleon-blue hover:border-transparent rounded"
                  }
                  onClick={props.onCancelHandler}
                >
                  Cancel
                </button>
                <Button type="submit">Create</Button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
