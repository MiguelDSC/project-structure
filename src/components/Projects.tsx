import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router";
import dummyFolderList, { FolderItemType } from "./folder/DummyFolderList";
import FolderList from "./folder/FolderList";
import DocList from "./foleondoc/DocList";
import { DocItemType } from "./foleondoc/DocListItem";
import dummylist from "./foleondoc/TempList";
import ProjectHeader from "./ProjectHeader";
import SectionLabel from "./SectionLabel";
import SortButton from "./SortButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Workspace from "./Workspace";
import ProjectNavbar from "./ProjectNavbar";

function Projects(props: PropsWithChildren) {
  let location = useLocation();
  const [folders, setFolders] = useState<FolderItemType[]>(dummyFolderList);
  const [docs, setDocs] = useState<DocItemType[]>(dummylist);
  const [isDocHidden, setDocHidden] = useState(false);
  const [isFolHidden, setFolHidden] = useState(false);
  const [sort, setSort] = useState(false);
  let newFolders: FolderItemType[];
  let newDocs: DocItemType[];
  let tempFolders: FolderItemType[];
  let tempDocs: DocItemType[];

  const updateList = () => {
    newFolders = [...dummyFolderList];
    newDocs = [...dummylist];

    const currentFolder = dummyFolderList.filter((folder) => {
      return folder.path === location.pathname;
    });

    tempFolders = newFolders.filter((folder) => {
      if (location.pathname === "/") {
        if (folder.parent == undefined) {
          return folder;
        }
      } else {
        if (currentFolder[0].childeren!.includes(folder.id)) {
          if (folder.path !== location.pathname) {
            return folder;
          }
        }
      }
    });

    tempDocs = newDocs.filter((doc) => {
      if (location.pathname === "/") {
        if (doc.parent == undefined) {
          return doc;
        }
      }

      if (currentFolder[0] != undefined) {
        if (currentFolder[0].hasOwnProperty("id")) {
          if (doc.parent === currentFolder[0].id) {
            return doc;
          }
        }
      }
    });

    setDocs(tempDocs);
    setFolders(tempFolders);
  };

  useEffect(() => {
    updateList();
  }, [location.pathname]);

  const addFolderHandler = (folder: FolderItemType) => {
    dummyFolderList.unshift(folder);
    updateList();
  };

  const toggleDocHidden = () => {
    setDocHidden((state) => {
      return !state;
    });
  };

  const toggleFolHidden = () => {
    setFolHidden((state) => {
      return !state;
    });
  };

  const selectSortHandler = (isUpward: boolean) => {
    setSort(isUpward);
  };

  return (
    <>
      <Workspace />
      <ProjectHeader />
      <DndProvider backend={HTML5Backend}>
        <div>
          <ProjectNavbar
            onMoveItem={updateList}
            addFolderHandler={addFolderHandler}
          />
        </div>

        <div>
          <div className="flex justify-between items-start">
            <SectionLabel
              isActive={isFolHidden}
              title="Folders"
              count={folders.length}
              onClick={toggleFolHidden}
            />
            <SortButton selectSort={selectSortHandler} />
          </div>
          <div className={isFolHidden ? "hidden" : ""}>
            <FolderList onMoveItem={updateList} list={folders} sort={sort} />
          </div>
        </div>
        <div>
          <SectionLabel
            isActive={isDocHidden}
            title="Foleon Docs"
            count={docs.length}
            onClick={toggleDocHidden}
          />
          <div className={isDocHidden ? "hidden" : ""}>
            <DocList list={docs} sort={sort} />
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default Projects;
