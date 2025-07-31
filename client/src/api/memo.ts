import { Memo, MemoCreateRequest } from "@/types/memo";
import api from "./axios";

export const fetchMemo = async (date: string): Promise<Memo | null> => {
  const res = await api.get<Memo[]>("/api/memos", { params: { date } });
  return res.data.length > 0 ? res.data[0] : null;
};

export const createMemo = async (data: MemoCreateRequest): Promise<Memo> => {
  const res = await api.post<Memo>("/api/memos", data);
  return res.data;
};

export const updateMemo = async (id: number, data: Partial<MemoCreateRequest>): Promise<Memo> => {
  const res = await api.patch<Memo>(`/api/memos/${id}`, data);
  return res.data;
};

export const deleteMemo = async (id: number): Promise<void> => {
  await api.delete(`/api/memos/${id}`);
};
