import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean; // Get isOpen prop from parent
  onOpenChange: (open: boolean) => void; // Get onOpenChange prop from parent
  title: string;
  children: ReactNode;
}

export default function GSModal({
  isOpen,
  onOpenChange,
  title,
  children,
}: IProps) {
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      onOpenChange={onOpenChange}
      className="py-5"
      backdrop="blur"
    >
      <ModalContent className="max-h-[100vh] overflow-y-auto scrollbar-hide">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
