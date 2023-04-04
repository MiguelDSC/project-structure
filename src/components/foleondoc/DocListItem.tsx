import stockV2 from "../../assets/stockV2.png";
import { useDrag } from "react-dnd";
import { DragAndDropType } from "../DragAndDropType";

export type DocItemType = {
  id: number;
  title: string;
  image: string;
  linkPreview: string;
  linkEdit: string;
  published: boolean;
  parent?: number;
};

type DocItemProps = {
  DocItem: DocItemType;
};

function DocListItem(props: DocItemProps) {
  function isImgUrl(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  }

  const isImage: boolean = isImgUrl(props.DocItem.image);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DragAndDropType.DOCUMENT,
      id: props.DocItem.id,
    },
    type: DragAndDropType.DOCUMENT,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      style={{
        opacity: isDragging ? 0.3 : 1,
        cursor: "move",
      }}
    >
      <div className="mr-5 w-full">
        <div className="rounded overflow-hidden shadow-lg" ref={drag}>
          {!isImage && (
            <img className="h-48 w-full" src={stockV2} alt="Stock-Image" />
          )}
          {isImage && (
            <img
              className="h-48 w-full"
              src={props.DocItem.image}
              alt="Picture"
            />
          )}
          <div className="px-10 py-4 flex space-x-4 items-center justify-center">
            <div className="block">
              {props.DocItem.published && (
                <div className="w-6 h-6 bg-green-400 rounded-full"></div>
              )}
              {!props.DocItem.published && (
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              )}
            </div>
            <a
              href={props.DocItem.linkPreview}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                color="primaries.light"
                className="icon__Icon-zowch7-0 hUpRGu"
                height="28px"
                width="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
              </svg>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                color="primaries.light"
                className="icon__Icon-zowch7-0 hUpRGu"
                height="28px"
                width="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                color="primaries.light"
                className="icon__Icon-zowch7-0 hUpRGu"
                height="28px"
                width="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </a>
          </div>
        </div>
        <p className="text-center mt-3">{props.DocItem.title}</p>
      </div>
    </li>
  );
}

export default DocListItem;
