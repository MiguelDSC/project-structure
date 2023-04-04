import { useEffect, useState } from "react";
import DocListItem, { DocItemType } from "./DocListItem";

type DocListProps = {
  list: DocItemType[];
  sort: boolean;
};

function DocList(props: DocListProps) {
  const [data, setData] = useState<DocItemType[]>([]);

  useEffect(() => {
    sortData();
  }, [props]);

  const sortData = () => {
    let sample = Object.assign([], props.list);
    switch (props.sort) {
      case false: {
        sample = sample.sort((a: DocItemType, b: DocItemType) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });

        setData(sample);
        break;
      }
      case true: {
        sample = sample
          .sort((a: DocItemType, b: DocItemType) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          })
          .reverse();
        setData(sample);
        break;
      }
    }
  };

  let content = data.map((item) => {
    return (
      <div className="mb-8" key={item.id}>
        <DocListItem
          DocItem={{
            id: item.id,
            title: item.title,
            image: item.image,
            linkPreview: item.linkPreview,
            linkEdit: item.linkEdit,
            published: item.published,
          }}
        />
      </div>
    );
  });

  return <ul className="grid gap-x-12 grid-cols-4">{content}</ul>;
}

export default DocList;
