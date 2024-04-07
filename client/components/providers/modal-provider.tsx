"use client";

import { useModalStore, ModalType } from "@/hooks/store/use-modal-store";
import ChangeUsernameModal from "@/components/modals/change-username-modal";
import ChangePasswordModal from "../modals/change-password-modal";
import ChangeAvatarModal from "../modals/change-avatar-modal";
import ImageModal from "../modals/image-modal";

import { Dialog } from "@/components/ui/dialog";

const modalsMap: { [key in ModalType]: JSX.Element } = {
  "change username": <ChangeUsernameModal />,
  "change password": <ChangePasswordModal />,
  "change avatar": <ChangeAvatarModal />,
  image: <ImageModal />,
};

export function ModalProvider() {
  const { isOpen, type, onClose } = useModalStore();

  if (!type || !isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {modalsMap[type]}
    </Dialog>
  );
}
