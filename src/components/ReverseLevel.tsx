import React from "react";
import { useDrop } from "react-dnd";
import { DragAndDropType } from "./DragAndDropType";
import dummyFolderList from "./folder/DummyFolderList";
import {
  findFolder,
  removeCurrentFromParent,
  updateFirstLayerPath,
} from "./folder/FolderCard";
import dummylist from "./foleondoc/TempList";

type item = {
  type: string;
  id: number;
};

export type FolderItemType = {
  id: number;
  folderName: string;
  path: string;
  parent?: number;
  childeren?: number[];
};

type ReverseLevelProps = {
  onMoveItem: () => void;
};

function ReverseLevel(props: ReverseLevelProps) {
  let parentFolderId: number;
  const currentFolder = dummyFolderList.find(
    (folder) => folder.path === location.pathname
  );

  if (currentFolder != undefined) {
    if (currentFolder.parent != undefined) {
      parentFolderId = currentFolder.parent;
    }
  }

  const [{ isOver }, drop] = useDrop({
    accept: [DragAndDropType.DOCUMENT, DragAndDropType.FOLDER],
    drop: (item: item, monitor: any) => {
      if (item.type === DragAndDropType.DOCUMENT) {
        moveDocument(item.id, parentFolderId);
      }

      if (item.type === DragAndDropType.FOLDER && item.id !== parentFolderId) {
        moveFolder(item.id, parentFolderId);
      }
    },

    collect: (monitor: { isOver: () => any }) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveDocument = (documentId: any, parentId?: number) => {
    const document = dummylist.find((document) => document.id === documentId);
    const folder = dummyFolderList.find((folder) => folder.id === parentId);

    if (folder != undefined) {
      folder.childeren?.push(documentId);
    }
    if (document != undefined) {
      document.parent = parentId;
    }
    props.onMoveItem();
  };

  const moveFolder = (folderId: any, parentId?: number) => {
    // get parent folder
    const newParentFolder = findFolder(parentId!);

    const currentFolder = findFolder(folderId);

    const parentFolder = findFolder(currentFolder?.parent!);

    if (currentFolder != undefined) {
      if (parentFolder != undefined) {
        removeCurrentFromParent(currentFolder, parentFolder);
        delete currentFolder.parent;
      }

      if (newParentFolder == undefined) {
        updateFirstLayerPath(currentFolder, newParentFolder);
      }
      props.onMoveItem();
    }
  };

  return (
    <div className="w-full flex justify-end">
      <div
        ref={drop}
        style={{ backgroundColor: isOver ? "lightgrey" : "" }}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
      >
        <p className="">Return File</p>
      </div>
    </div>
  );
}

export default ReverseLevel;
