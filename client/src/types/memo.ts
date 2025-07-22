export interface Memo {
  id: number;
  date: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoCreateRequest {
  date: string;
  content: string;
}
