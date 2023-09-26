export interface Post {
  username: string;
  datetime: string;
  message: string;
}

export interface PostExt extends Post {
  id: number;
}

export interface TableConfig {
  thead: {
    columns: TableColumn[];
  };
}

interface TableColumn {
  field: string;
  visible: boolean;
  order: number;
  header: string;
  actionsColumn?: boolean;
}
