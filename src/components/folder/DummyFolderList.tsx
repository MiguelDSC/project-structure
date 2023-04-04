export type FolderItemType = {
  id: number;
  folderName: string;
  path: string;
  parent?: number;
  childeren?: number[];
};

let dummyFolderList: FolderItemType[] = [
  {
    id: 1,
    folderName: "folder 1",
    path: "/folder1",
    childeren: [9, 10, 100, 110, 111, 112, 113, 114],
  },
  {
    id: 2,
    folderName: "folder 2",
    path: "/folder2",
    childeren: [103],
  },
  {
    id: 3,
    folderName: "folder 3",
    path: "/folder3",
    childeren: [104],
  },
  {
    id: 4,
    folderName: "folder 4",
    path: "/folder4",
    childeren: [105],
  },
  {
    id: 5,
    folderName: "folder 5",
    path: "/folder5",
    childeren: [],
  },
  {
    id: 6,
    folderName: "folder 6",
    path: "/folder6",
    childeren: [],
  },
  {
    id: 7,
    folderName: "folder 7",
    path: "/folder7",
    childeren: [],
  },
  {
    id: 8,
    folderName: "folder 8",
    path: "/folder8",
    childeren: [],
  },
  {
    id: 9,
    folderName: "folder 9",
    path: "/folder1/folder9",
    parent: 1,
    childeren: [101],
  },
  {
    id: 10,
    folderName: "folder 10",
    path: "/folder1/folder10",
    parent: 1,
    childeren: [102],
  },
];

export default dummyFolderList;
