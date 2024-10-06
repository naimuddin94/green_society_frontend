import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  title: string;
  children: ReactNode;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  buttonIcon?: ReactNode;
}

export default function GSModal({
  buttonText,
  title,
  children,
  buttonVariant = "light",
  buttonClassName,
  buttonIcon,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();
  const router = useRouter();

  const handleModal = () => {
    if (!user?.email) {
      router.push(`/signin?redirect=post`);
    } else {
      onOpen();
    }
  };
  return (
    <>
      <Button
        className={buttonClassName}
        variant={buttonVariant}
        onPress={handleModal}
        startContent={buttonIcon}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="py-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
