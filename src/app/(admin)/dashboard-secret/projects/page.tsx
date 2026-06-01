"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Plus } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { projectSchema, ProjectFormValues } from "@/lib/validations";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: () => fetch("/api/admin/projects").then((r) => r.json()),
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
      featured: false,
      order: 0,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: ProjectFormValues) => {
      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";
      return fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success(editingId ? "Project updated" : "Project created");
      setModalOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: () => toast.error("Failed to save project"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/projects/${id}`, { method: "DELETE" }).then((r) =>
        r.json()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete project"),
  });

  function openEdit(project: Project) {
    setEditingId(project.id);
    form.reset({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || "",
      techStack: project.techStack,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      order: project.order,
    });
    setModalOpen(true);
  }

  function openCreate() {
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
      featured: false,
      order: 0,
    });
    setModalOpen(true);
  }

  const columns: Column<Project>[] = [
    { key: "title", header: "Title", render: (p) => <strong>{p.title}</strong> },
    {
      key: "techStack",
      header: "Tech",
      render: (p) => (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {p.techStack.slice(0, 3).map((t) => (
            <Badge key={t} variant="accent">{t}</Badge>
          ))}
        </div>
      ),
    },
    { key: "featured", header: "Featured", render: (p) => p.featured ? "⭐" : "—", width: "80px" },
    { key: "order", header: "Order", width: "60px" },
  ];

  return (
    <div>
      <Header>
        <Title>Projects</Title>
        <Button onClick={openCreate}>
          <Plus size={16} weight="bold" />
          Add Project
        </Button>
      </Header>

      <DataTable
        columns={columns}
        data={projects}
        onEdit={openEdit}
        onDelete={(p) => setDeleteId(p.id)}
        getItemId={(p) => p.id}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Project" : "New Project"}
        size="lg"
      >
        <form
          onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))}
        >
          <FormGrid>
            <FullWidth>
              <Input
                label="Title"
                placeholder="Project title"
                error={form.formState.errors.title?.message}
                {...form.register("title")}
              />
            </FullWidth>
            <FullWidth>
              <TextArea
                placeholder="Project description"
                aria-label="Description"
                {...form.register("description")}
              />
            </FullWidth>
            <FullWidth>
              <CloudinaryUpload
                currentUrl={form.watch("imageUrl")}
                onUpload={(url) => form.setValue("imageUrl", url)}
              />
              <input type="hidden" {...form.register("imageUrl")} />
            </FullWidth>
            <Input
              label="Live URL"
              placeholder="https://..."
              error={form.formState.errors.liveUrl?.message}
              {...form.register("liveUrl")}
            />
            <Input
              label="GitHub URL"
              placeholder="https://github.com/..."
              {...form.register("githubUrl")}
            />
            <div>
              <Input
                label="Order"
                type="number"
                {...form.register("order", { valueAsNumber: true })}
              />
            </div>
            <div>
              <CheckboxLabel>
                <input type="checkbox" {...form.register("featured")} />
                Featured
              </CheckboxLabel>
              <input
                type="hidden"
                {...form.register("techStack")}
              />
            </div>
          </FormGrid>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saveMutation.isPending}>
              {editingId ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        itemName={projects.find((p) => p.id === deleteId)?.title || ""}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
