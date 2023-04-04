import {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import dummyFolderList from "../folder/DummyFolderList";
import dummylist from "../foleondoc/TempList";
import { findFolder } from "./FolderCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type editFolderProps = {
  currentId: number | undefined;
  activedDeleteModal: (id: number) => void;
  update: () => void;
  deleteId: number;
};

export const EditFolder = forwardRef((props: editFolderProps, ref) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isActive, setActive] = useState(true);
  const input = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    childFunction1() {
      deleteHandler();
    },
  }));

  function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(true);
          setIsShowing(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(menuRef);

  const deleteHandler = () => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (props.deleteId === dummyFolderList[index].id) {
        // gets /folder2 out /folder1/folder2
        let namePath = "/" + dummyFolderList[index].folderName;
        let namePathTrim = namePath.replace(/\s/g, "");

        deleteChildFromParent(dummyFolderList[index].parent, props.deleteId);

        for (let j = 0; j < dummyFolderList[index].childeren!.length; j++) {
          changeChildParent(
            dummyFolderList[index].childeren![j],
            dummyFolderList[index].parent
          );

          updatePathChild(dummyFolderList[index].childeren![j], namePathTrim);

          addChildToParent(
            dummyFolderList[index].parent,
            dummyFolderList[index].childeren![j]
          );
        }
        // delete folder
        dummyFolderList.splice(index, 1);
      }
      props.update();
    }
  };

  const checkDeleteHandler = (id: number) => {
    props.activedDeleteModal(id);
  };

  // change childs parent id to the new parent
  const changeChildParent = (
    idChild: number | undefined,
    idParent: number | undefined
  ) => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (idChild === dummyFolderList[index].id) {
        dummyFolderList[index].parent = idParent;
      }
    }
    for (let j = 0; j < dummylist.length; j++) {
      if (dummylist[j].parent === props.deleteId) {
        dummylist[j].parent = idParent;
      }
    }
  };

  // update path of child
  const updatePathChild = (childId: number, currentPath: string) => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (childId === dummyFolderList[index].id) {
        let newPath = dummyFolderList[index].path.replace(currentPath, "");
        dummyFolderList[index].path = newPath;
      }
    }
  };

  // add childeren to parent
  const addChildToParent = (idParent: number | undefined, idChild: number) => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (idParent === dummyFolderList[index].id) {
        dummyFolderList[index].childeren?.push(idChild);
      }
    }
    for (let j = 0; j < dummylist.length; j++) {
      if (dummylist[j].parent === props.deleteId) {
        dummylist[j].parent = idParent;
      }
    }
  };

  // delete current from parent child
  const deleteChildFromParent = (
    idParent: number | undefined,
    currentId: number | undefined
  ) => {
    const parentFolder = findFolder(idParent!);

    if (parentFolder != undefined && currentId != undefined) {
      let index = parentFolder.childeren?.indexOf(currentId);
      parentFolder.childeren?.splice(index!, 0);
    }
  };

  const renameHandler = () => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (props.currentId === dummyFolderList[index].id) {
        // split path in pieces
        let namePath = "/" + dummyFolderList[index].folderName;
        let namePathTrim = namePath.replace(/\s/g, "");
        let newPathPart = "/" + input.current!.value.replace(/\s/g, "");

        let newpath = dummyFolderList[index].path.replace(
          namePathTrim,
          newPathPart
        );

        // change childeren path
        if (dummyFolderList[index].childeren !== undefined) {
          for (let j = 0; j < dummyFolderList[index].childeren!.length; j++) {
            changePathChilderen(
              dummyFolderList[index].childeren![j],
              namePathTrim
            );
          }
        }

        // change path
        dummyFolderList[index].path = newpath;

        // change name
        dummyFolderList[index].folderName = input.current!.value.replace(
          /\s/g,
          ""
        );

        props.update();
      }
      setActive(true);
      setIsShowing(false);
    }
  };

  const changePathChilderen = (
    id: number | undefined,
    oldCurrentPath: string
  ) => {
    for (let index = 0; index < dummyFolderList.length; index++) {
      if (id === dummyFolderList[index].id) {
        let newPathPart = "/" + input.current!.value.replace(/\s/g, "");
        let newpath = dummyFolderList[index].path.replace(
          oldCurrentPath,
          newPathPart
        );

        dummyFolderList[index].path = newpath;
      }
    }
  };

  return (
    <div ref={menuRef}>
      <Menu as="div" className="relative inline-block text-left mt-1">
        <div>
          <Menu.Button
            className=""
            onClick={() => {
              setIsShowing(true);
            }}
          >
            <svg
              strokeWidth="0"
              height="28px"
              width="28px"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1 z-0"
            >
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </Menu.Button>
        </div>

        <Transition
          show={isShowing}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <>
                    <div className={!isActive ? "hidden" : ""}>
                      <a
                        onClick={() => {
                          setActive(false);
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Rename
                      </a>
                    </div>
                    <div className="m-1 text-sm flex">
                      <input
                        ref={input}
                        type="text"
                        maxLength={12}
                        required
                        pattern="^[^\\/]*$"
                        placeholder="Fill in the name"
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" ||
                            event.key === "/" ||
                            event.key === "." ||
                            event.key === "\\" ||
                            event.key === " "
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className={
                          isActive ? "hidden" : "" + "rounded border m-1"
                        }
                      />
                      <button
                        className={
                          isActive
                            ? "hidden"
                            : "" + "bg-blue-300 rounded mr-3 border"
                        }
                        onClick={renameHandler}
                      >
                        Change
                      </button>
                    </div>
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => checkDeleteHandler(props.currentId!)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Delete
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
});
export default EditFolder;
