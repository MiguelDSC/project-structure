import BreadCrumbs from "./BreadCrumbs";
import CreateButton from "./createFolder/CreateButton";
import { FolderItemType } from "./folder/DummyFolderList";
import ReverseLevel from "./ReverseLevel";

type ProjectNavbarProps = {
  addFolderHandler: (newFolder: FolderItemType) => void;
  onMoveItem: () => void;
};

function ProjectNavbar(props: ProjectNavbarProps) {
  return (
    <>
      <div className="flex items-center border-b-2 py-2 mt-10 mb-8  relative">
        <CreateButton onCreateFolder={props.addFolderHandler} />
        <BreadCrumbs />
        {location.pathname !== "/" && (
          <ReverseLevel onMoveItem={props.onMoveItem} />
        )}
      </div>
    </>
  );
}

export default ProjectNavbar;
