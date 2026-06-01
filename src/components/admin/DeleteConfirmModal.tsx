"use client";

import React from "react";
import styled from "styled-components";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}

const Text = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" size="sm">
      <Text>
        Are you sure you want to delete <strong>{itemName}</strong>? This action
        cannot be undone.
      </Text>
      <Actions>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          loading={loading}
          style={{
            background: "#f87171",
          }}
        >
          Delete
        </Button>
      </Actions>
    </Modal>
  );
}
