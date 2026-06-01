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
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { skillSchema, SkillFormValues } from "@/lib/validations";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  iconName: string;
  order: number;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
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

const FormActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

export default function AdminSkillsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ["admin-skills"],
    queryFn: () => fetch("/api/admin/skills").then((r) => r.json()),
  });

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiencyLevel: 75,
      iconName: "code",
      order: 0,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: SkillFormValues) => {
      const url = editingId
        ? `/api/admin/skills/${editingId}`
        : "/api/admin/skills";
      return fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
      toast.success(editingId ? "Skill updated" : "Skill created");
      setModalOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: () => toast.error("Failed to save skill"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/skills/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
      toast.success("Skill deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete skill"),
  });

  function openEdit(skill: Skill) {
    setEditingId(skill.id);
    form.reset({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
      iconName: skill.iconName,
      order: skill.order,
    });
    setModalOpen(true);
  }

  function openCreate() {
    setEditingId(null);
    form.reset({
      name: "",
      category: "",
      proficiencyLevel: 75,
      iconName: "code",
      order: 0,
    });
    setModalOpen(true);
  }

  const columns: Column<Skill>[] = [
    { key: "name", header: "Name", render: (s) => <strong>{s.name}</strong> },
    { key: "category", header: "Category" },
    { key: "proficiencyLevel", header: "Level", render: (s) => `${s.proficiencyLevel}%` },
    { key: "order", header: "Order", width: "60px" },
  ];

  return (
    <div>
      <Header>
        <Title>Skills</Title>
        <Button onClick={openCreate}>
          <Plus size={16} weight="bold" />
          Add Skill
        </Button>
      </Header>

      <DataTable
        columns={columns}
        data={skills}
        onEdit={openEdit}
        onDelete={(s) => setDeleteId(s.id)}
        getItemId={(s) => s.id}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Skill" : "New Skill"}
        size="md"
      >
        <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))}>
          <FormGrid>
            <Input
              label="Name"
              placeholder="Skill name"
              error={form.formState.errors.name?.message}
              {...form.register("name")}
            />
            <Input
              label="Category"
              placeholder="e.g. Frontend, Backend"
              error={form.formState.errors.category?.message}
              {...form.register("category")}
            />
            <Input
              label="Proficiency (1-100)"
              type="number"
              min={1}
              max={100}
              {...form.register("proficiencyLevel", { valueAsNumber: true })}
            />
            <Input
              label="Icon Name"
              placeholder="code, globe, database, etc."
              {...form.register("iconName")}
            />
            <Input
              label="Order"
              type="number"
              {...form.register("order", { valueAsNumber: true })}
            />
          </FormGrid>
          <FormActions>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={saveMutation.isPending}>
              {editingId ? "Update" : "Create"}
            </Button>
          </FormActions>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        itemName={skills.find((s) => s.id === deleteId)?.name || ""}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
