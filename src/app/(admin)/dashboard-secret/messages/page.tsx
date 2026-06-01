"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Envelope, EnvelopeOpen, CaretDown, CaretUp } from "@phosphor-icons/react";
import GlassCard from "@/components/ui/GlassCard";
import Spinner from "@/components/ui/Spinner";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MessageCard = styled(GlassCard)<{ $isRead: boolean }>`
  cursor: pointer;
  opacity: ${({ $isRead }) => ($isRead ? 0.6 : 1)};
  transition: all 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SenderMeta = styled.div``;

const SenderName = styled.span<{ $unread: boolean }>`
  font-weight: ${({ $unread, theme }) =>
    $unread ? theme.fontWeight.semibold : theme.fontWeight.medium};
  display: block;
`;

const SenderEmail = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MessageDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

const MessageBody = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ActionButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: background 0.2s;

  &:hover {
    background: rgba(129, 140, 248, 0.1);
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function AdminMessagesPage() {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["admin-messages"],
    queryFn: () => fetch("/api/admin/messages").then((r) => r.json()),
  });

  const toggleReadMutation = useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) =>
      fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Updated");
    },
    onError: () => toast.error("Failed to update"),
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <Header>
        <Title>Messages</Title>
        <Subtitle>
          {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
        </Subtitle>
      </Header>

      {isLoading ? (
        <Spinner size={32} />
      ) : messages.length === 0 ? (
        <Empty>No messages yet.</Empty>
      ) : (
        <List>
          {messages.map((msg) => (
            <MessageCard key={msg.id} $isRead={msg.isRead}>
              <MessageHeader
                onClick={() =>
                  setExpandedId(expandedId === msg.id ? null : msg.id)
                }
              >
                <SenderInfo>
                  <Avatar>
                    {msg.isRead ? (
                      <EnvelopeOpen size={20} weight="bold" />
                    ) : (
                      <Envelope size={20} weight="bold" />
                    )}
                  </Avatar>
                  <SenderMeta>
                    <SenderName $unread={!msg.isRead}>{msg.name}</SenderName>
                    <SenderEmail>{msg.email}</SenderEmail>
                  </SenderMeta>
                </SenderInfo>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <MessageDate>
                    {format(new Date(msg.createdAt), "MMM d, yyyy")}
                  </MessageDate>
                  {expandedId === msg.id ? (
                    <CaretUp size={16} />
                  ) : (
                    <CaretDown size={16} />
                  )}
                </div>
              </MessageHeader>
              {expandedId === msg.id && (
                <>
                  <MessageBody>{msg.message}</MessageBody>
                  <Actions>
                    <ActionButton
                      onClick={() =>
                        toggleReadMutation.mutate({
                          id: msg.id,
                          isRead: !msg.isRead,
                        })
                      }
                    >
                      Mark as {msg.isRead ? "Unread" : "Read"}
                    </ActionButton>
                  </Actions>
                </>
              )}
            </MessageCard>
          ))}
        </List>
      )}
    </div>
  );
}
