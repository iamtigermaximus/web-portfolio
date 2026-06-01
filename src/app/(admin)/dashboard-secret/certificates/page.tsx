"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Plus } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import DataTable, { Column } from "@/components/admin/DataTable";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { certificateSchema, CertificateFormValues } from "@/lib/validations";

interface Certificate {
  id: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  skillsLearned: string[];
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

export default function AdminCertificatesPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: certificates = [] } = useQuery<Certificate[]>({
    queryKey: ["admin-certificates"],
    queryFn: () => fetch("/api/admin/certificates").then((r) => r.json()),
  });

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      courseName: "",
      issuer: "",
      issueDate: "",
      credentialUrl: "",
      imageUrl: "",
      skillsLearned: [],
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: CertificateFormValues) => {
      const url = editingId
        ? `/api/admin/certificates/${editingId}`
        : "/api/admin/certificates";
      return fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      toast.success(editingId ? "Certificate updated" : "Certificate created");
      setModalOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: () => toast.error("Failed to save certificate"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/certificates/${id}`, { method: "DELETE" }).then((r) =>
        r.json()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      toast.success("Certificate deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete certificate"),
  });

  function openEdit(cert: Certificate) {
    setEditingId(cert.id);
    form.reset({
      courseName: cert.courseName,
      issuer: cert.issuer,
      issueDate: cert.issueDate
        ? new Date(cert.issueDate).toISOString().split("T")[0]
        : "",
      credentialUrl: cert.credentialUrl || "",
      imageUrl: cert.imageUrl || "",
      skillsLearned: cert.skillsLearned,
    });
    setModalOpen(true);
  }

  function openCreate() {
    setEditingId(null);
    form.reset({
      courseName: "",
      issuer: "",
      issueDate: "",
      credentialUrl: "",
      imageUrl: "",
      skillsLearned: [],
    });
    setModalOpen(true);
  }

  const columns: Column<Certificate>[] = [
    { key: "courseName", header: "Course", render: (c) => <strong>{c.courseName}</strong> },
    { key: "issuer", header: "Issuer" },
    {
      key: "issueDate",
      header: "Issued",
      render: (c) => format(new Date(c.issueDate), "MMM yyyy"),
    },
  ];

  return (
    <div>
      <Header>
        <Title>Certificates</Title>
        <Button onClick={openCreate}>
          <Plus size={16} weight="bold" />
          Add Certificate
        </Button>
      </Header>

      <DataTable
        columns={columns}
        data={certificates}
        onEdit={openEdit}
        onDelete={(c) => setDeleteId(c.id)}
        getItemId={(c) => c.id}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Certificate" : "New Certificate"}
        size="lg"
      >
        <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))}>
          <FormGrid>
            <Input
              label="Course Name"
              placeholder="Certificate name"
              error={form.formState.errors.courseName?.message}
              {...form.register("courseName")}
            />
            <Input
              label="Issuer"
              placeholder="Issuing organization"
              error={form.formState.errors.issuer?.message}
              {...form.register("issuer")}
            />
            <Input
              label="Issue Date"
              type="date"
              error={form.formState.errors.issueDate?.message as string}
              {...form.register("issueDate")}
            />
            <Input
              label="Credential URL"
              placeholder="https://..."
              {...form.register("credentialUrl")}
            />
            <div>
              <CloudinaryUpload
                currentUrl={form.watch("imageUrl")}
                onUpload={(url) => form.setValue("imageUrl", url)}
              />
              <input type="hidden" {...form.register("imageUrl")} />
            </div>
            <div>
              <input type="hidden" {...form.register("skillsLearned")} />
              <input type="hidden" {...form.register("credentialUrl")} />
            </div>
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
        itemName={
          certificates.find((c) => c.id === deleteId)?.courseName || ""
        }
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
