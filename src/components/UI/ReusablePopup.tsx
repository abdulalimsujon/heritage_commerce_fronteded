"use client";

import React, { ReactNode } from "react";
import { Modal, Button } from "@nextui-org/react";

interface ReusablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const ReusablePopup: React.FC<ReusablePopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Modal.Header>
        {title && (
          <h3 id="modal-title" className="text-lg font-bold">
            {title}
          </h3>
        )}
      </Modal.Header>

      <Modal.Body>
        <div id="modal-description">{children}</div>
      </Modal.Body>

      {/* Footer Area - Custom div instead of Modal.Footer */}
      <div className="flex justify-end p-4 gap-2">
        {footer}
        <Button color="error" onClick={onClose} auto>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ReusablePopup;
