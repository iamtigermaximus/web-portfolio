"use client";

import React from "react";
import styled from "styled-components";
import { PencilSimple, Trash } from "@phosphor-icons/react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  getItemId: (item: T) => string;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ $width?: string }>`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  width: ${({ $width }) => $width || "auto"};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $danger }) =>
    $danger ? "rgba(248, 113, 113, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.error : theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "rgba(248, 113, 113, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Wrapper = styled.div`
  overflow-x: auto;
`;

export default function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  getItemId,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <Empty>No items found.</Empty>;
  }

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key} $width={col.width}>
                {col.header}
              </Th>
            ))}
            <Th $width="100px">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Tr key={getItemId(item)}>
              {columns.map((col) => (
                <Td key={col.key}>
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </Td>
              ))}
              <Td>
                <ActionButtons>
                  <IconButton onClick={() => onEdit(item)}>
                    <PencilSimple size={14} weight="bold" />
                  </IconButton>
                  <IconButton $danger onClick={() => onDelete(item)}>
                    <Trash size={14} weight="bold" />
                  </IconButton>
                </ActionButtons>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
