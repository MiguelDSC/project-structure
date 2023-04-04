import { useEffect, useRef, useState } from "react";
import DeleteModal from "../DeleteModal";
import LimitModal from "../LimitModal";
import { FolderItemType } from "./DummyFolderList";
import FolderCard from "./FolderCard";

type FolderListProps = {
  list: FolderItemType[];
  sort: boolean;
  onMoveItem: () => void;
};

function FolderList(props: FolderListProps) {
  const [deleteId, setDeleteId] = useState(0);
  const [data, setData] = useState<FolderItemType[]>([]);
  const [closeLimitModal, setCloseLimitModal] = useState<boolean>(false);
  const [closeDeleteModal, setCloseDeleteModal] = useState<boolean>(false);
  const cardRef = useRef(null);

  useEffect(() => {
    sortData();
  }, [props]);

  const sortData = () => {
    let sample = Object.assign([], props.list);
    switch (props.sort) {
      case false: {
        sample = sample.sort((a: FolderItemType, b: FolderItemType) => {
          if (a.folderName < b.folderName) return -1;
          if (a.folderName > b.folderName) return 1;
          return 0;
        });

        setData(sample);
        break;
      }
      case true: {
        sample = sample
          .sort((a: FolderItemType, b: FolderItemType) => {
            if (a.folderName < b.folderName) return -1;
            if (a.folderName > b.folderName) return 1;
            return 0;
          })
          .reverse();
        setData(sample);
        break;
      }
    }
  };

  const confirmLimitHandler = () => {
    setCloseLimitModal(false);
  };

  const activedLimitModal = () => {
    setCloseLimitModal(true);
  };

  const activedDeleteModal = (id: number) => {
    setDeleteId(id);

    setCloseDeleteModal(true);
  };

  const cancelDeleteModal = () => {
    console.log("cancel button");
    setCloseDeleteModal(false);
  };

  const deleteModal = (id: number) => {
    cardRef.current.childFunction1();
    setCloseDeleteModal(false);
  };

  let content = data.map((item) => {
    return (
      <div key={item.id}>
        <FolderCard
          ref={cardRef}
          activedLimitModal={activedLimitModal}
          activedDeleteModal={(id) => activedDeleteModal(id)}
          onMoveItem={props.onMoveItem}
          id={item.id}
          path={item.path}
          folderName={item.folderName}
          deleteId={deleteId}
        />
      </div>
    );
  });
  return (
    <>
      <LimitModal
        close={closeLimitModal}
        onConfirm={confirmLimitHandler}
        title="Limit reached"
        message="You have reached the limit of folders inside folders"
      />
      <DeleteModal
        close={closeDeleteModal}
        title="Delete Warning"
        message="Are you sure you want to delete the folder the contents will move a folder up"
        onCancel={cancelDeleteModal}
        deleteId={deleteId}
        onDelete={(id) => {
          deleteModal(id);
        }}
      />
      <ul className="grid gap-x-12 grid-cols-4 mb-8">{content}</ul>
    </>
  );
}

export default FolderList;
