import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragAndDropType } from "../DragAndDropType";
import dummylist from "../foleondoc/TempList";
import dummyFolderList from "./DummyFolderList";
import EditFolder from "./EditFolder";
import { Link } from "react-router-dom";

type FolderCardProps = {
  folderName: string;
  id: number;
  path: string;
  onMoveItem: () => void;
  activedLimitModal: () => void;
  activedDeleteModal: (id: number) => void;
  deleteId: number;
};

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

export const hasTooManyLevels = (folder: FolderItemType) => {
  return folder?.path.split("/").filter((a) => a.length > 0).length >= 2;
};

export const findFolder = (folderId: number) => {
  return dummyFolderList.find((folder) => folder.id === folderId);
};

export const findDocument = (documentId: number) => {
  return dummyFolderList.find((document) => document.id === documentId);
};

export const updateFirstLayerPath = (
  currentFolder: FolderItemType,
  parentFolder: FolderItemType | undefined
) => {
  const trimCurrentFolder = trimName(currentFolder.folderName);
  if (parentFolder != undefined) {
    const trimParentFolder = trimName(parentFolder.folderName);
    currentFolder.path = trimParentFolder + trimCurrentFolder;

    return;
  }

  currentFolder.path = trimCurrentFolder;
};

export const updatePath = (
  currentFolder: FolderItemType,
  childCurrentFolder: FolderItemType,
  parentFolder: FolderItemType
) => {
  const trimCurrentFolder = trimName(currentFolder.folderName);
  const trimChildCurrentFolder = trimName(childCurrentFolder.folderName);
  const trimParentFolder = trimName(parentFolder.folderName);

  currentFolder.path = trimParentFolder + trimCurrentFolder;

  childCurrentFolder.path = currentFolder.path + trimChildCurrentFolder;
};

export const trimName = (input: string) => {
  let pathNamePath = "/" + input;
  let pathTrim = pathNamePath.replace(/\s/g, "");
  return pathTrim;
};

export const addChildToParent = (
  newParent: FolderItemType,
  childId: number
) => {
  newParent.childeren?.push(childId);
};

export const updateCurrentParentFolder = (
  currentFolder: FolderItemType,
  newParentFolderId: number
) => {
  currentFolder.parent = newParentFolderId;
};

export const removeCurrentFromParent = (
  currentFolder: FolderItemType,
  parentFolder: FolderItemType
) => {
  const index = parentFolder.childeren?.indexOf(currentFolder.id, 0);

  if (index! > -1) {
    parentFolder.childeren?.splice(index!, 1);
  }
};

const FolderCard = forwardRef((props: FolderCardProps, ref) => {
  const [dropFolderId, setDropFolderId] = useState(0);
  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    childFunction1() {
      callDelete();
    },
  }));

  const callDelete = () => {
    childRef.current.childFunction1();
  };

  const [{ isOver }, drop] = useDrop({
    accept: [DragAndDropType.DOCUMENT, DragAndDropType.FOLDER],
    drop: (item: item, monitor: any) => {
      if (item.type === DragAndDropType.DOCUMENT) {
        moveDocument(item.id, dropFolderId);
      }

      if (item.type === DragAndDropType.FOLDER && item.id !== dropFolderId) {
        const levelFolder = findFolder(dropFolderId);
        const levelItem = findFolder(item.id);

        if (levelItem?.childeren != undefined) {
          let passedLimit = false;
          if (levelItem?.childeren?.length > 0) {
            levelItem.childeren.forEach((folderId) => {
              let childFolder = findFolder(folderId);

              if (childFolder != undefined) {
                if (hasTooManyLevels(childFolder)) {
                  passedLimit = true;
                }
              }
            });
          }
          if (passedLimit) {
            props.activedLimitModal();
            return;
          }
        }

        if (levelFolder != undefined) {
          if (hasTooManyLevels(levelFolder)) {
            props.activedLimitModal();
            return;
          } else {
            moveFolder(item.id, dropFolderId);
          }
        }
      }
    },

    collect: (monitor: { isOver: () => any }) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    setDropFolderId(props.id);
  }, [drop]);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DragAndDropType.FOLDER,
      id: props.id,
    },
    type: DragAndDropType.FOLDER,

    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
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

    // get child folder
    const currentFolder = findFolder(folderId);

    // parent folder containing current
    const parentFolder = findFolder(currentFolder?.parent!);

    if (currentFolder != undefined && newParentFolder != undefined) {
      // remove folder 2 from folder 1

      // console.log(currentFolder, parentFolder);
      if (parentFolder != undefined) {
        removeCurrentFromParent(currentFolder, parentFolder);
      }

      updateCurrentParentFolder(currentFolder, newParentFolder?.id);

      // // add folder 2 id to folder 4 children
      addChildToParent(newParentFolder, currentFolder.id);

      if (newParentFolder != undefined) {
        if (
          currentFolder.childeren != undefined &&
          currentFolder.childeren!.length > 0
        ) {
          currentFolder.childeren?.forEach((folderId) => {
            let childFolder = dummyFolderList.find(
              (folder) => folder.id === folderId
            );

            if (childFolder != undefined) {
              updatePath(currentFolder, childFolder, newParentFolder);
            } else {
              updateFirstLayerPath(currentFolder, newParentFolder);
            }
          });
        } else {
          updateFirstLayerPath(currentFolder, newParentFolder);
        }
      }
    }
    props.onMoveItem();
  };

  return (
    <div ref={drag}>
      <div
        className="flex w-full h-10 shadow-md rounded mb-2 bg-white"
        ref={drop}
        style={{ backgroundColor: isOver ? "lightgrey" : "" }}
      >
        <svg
          fill="currentColor"
          strokeWidth="0"
          color="#42D1F5"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 mt-2 ml-2"
        >
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
        </svg>
        <div className="flex justify-between w-full">
          <Link to={props.path} className="mt-2">
            <p>{props.folderName}</p>
          </Link>
          <EditFolder
            deleteId={props.deleteId}
            ref={childRef}
            activedDeleteModal={(id) => props.activedDeleteModal(id)}
            update={props.onMoveItem}
            currentId={props.id}
          />
        </div>
      </div>
    </div>
  );
});

export default FolderCard;
