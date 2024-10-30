"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

type ReusableModalProps = {
  title?: string;
  content?: ReactNode;
  footerActions?: ReactNode;
  placement?: "top" | "center" | "bottom" | "auto";
} & (
  | { triggerText: string; triggerContent?: never }
  | { triggerContent: ReactNode; triggerText?: never }
);

export default function ReusableModal({
  title = "Default Modal Title",
  content,
  footerActions,
  placement = "auto",
  triggerText = "Open Modal",
  triggerContent, // Accept custom trigger content
}: ReusableModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState(placement);

  return (
    <div className="flex flex-col gap-2">
      {/* Trigger button or custom content */}
      <div onClick={onOpen} className="cursor-pointer">
        {triggerContent || (
          <span onClick={onOpen} className="max-w-fit">
            {triggerText}
          </span>
        )}
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Header */}
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

              {/* Body */}
              <ModalBody>{content}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
