import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Modal from "./Modal";
import { useState } from "react";
import { FolderItemType } from "../folder/DummyFolderList";
import LimitModal from "../LimitModal";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type CreateButtonProps = {
  onCreateFolder: (newFolder: FolderItemType) => void;
};

export default function FolderButton(props: CreateButtonProps) {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState<boolean>(false);

  //close and open create folder modal
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  //close and open limit modal
  const confirmHandler = () => {
    setClose(false);
  };

  const activedModal = () => {
    setClose(true);
  };

  //calls create function for folder
  const createFolder = (myFolder: FolderItemType) => {
    closeModal();
    props.onCreateFolder(myFolder);
  };

  return (
    <>
      <LimitModal
        close={close}
        onConfirm={confirmHandler}
        title="Limit reached"
        message="You have reached the limit of folders inside folders"
      />
      <Menu as="div" className="mr-10 relative inline-block text-left">
        <div style={{ minWidth: "max-content" }}>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18px"
              height="18px"
              fillRule="evenodd"
              className="-ml-2 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              />
            </svg>
            <p className="text-sm font-medium">Create New</p>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={openModal}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Create new Folder
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Create new Foleon Doc
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {open && (
        <Modal
          activedModal={activedModal}
          onSubmitFormHandler={createFolder}
          onCancelHandler={closeModal}
        />
      )}
    </>
  );
}
