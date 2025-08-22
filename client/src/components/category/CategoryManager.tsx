import CategoryManagerForm from "@/components/category/CategoryManagerForm";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings2 } from "lucide-react";
import { useState } from "react";

export default function CategoryManager() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="hover:text-blue-500 inline-flex items-center"
          aria-label="카테고리 관리"
          title="카테고리 관리">
          <Settings2 size={16} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="scale-75 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">카테고리 관리</Dialog.Title>
          <CategoryManagerForm />
          <Dialog.Close
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            aria-label="닫기">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
