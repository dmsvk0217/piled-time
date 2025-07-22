import CategoryManager from "@/components/CategoryManager";
import { Category } from "@/types/category";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings2 } from "lucide-react";

interface Props {
  categories: Category[];
  fetchCategory: () => Promise<void>;
}

export default function TodoTableHead({ categories, fetchCategory }: Props) {
  return (
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">
          <div className="flex items-center justify-center gap-2">
            카테고리
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="hover:text-blue-500">
                  <Settings2 size={16} />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
                  <Dialog.Title className="text-lg font-bold mb-4">카테고리 관리</Dialog.Title>
                  <CategoryManager categories={categories} fetchCategory={fetchCategory} />
                  <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-black">
                    ✕
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </th>
        <th className="border px-4 py-2">배치</th>
        <th className="border px-4 py-2">세부내용</th>
        <th className="border px-4 py-2">달성률 (%)</th>
        <th className="border px-4 py-2">...</th>
      </tr>
    </thead>
  );
}
