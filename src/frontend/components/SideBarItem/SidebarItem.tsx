export interface FileProps {
  type: "file";
  name: string;
  navigation: string;
  level: number;
}

export interface FolderProps {
  type: "folder";
  name: string;
  children: ItemProps[];
  level: number; 
}

export type ItemProps = FileProps | FolderProps;
