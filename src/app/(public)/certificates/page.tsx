import React from "react";
import { prisma } from "@/lib/prisma";
import CertificatesSection from "@/components/sections/CertificatesSection";
import PaginationRow from "@/components/ui/PaginationRow";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export default async function CertificatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  const [certificates, total] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { issueDate: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.certificate.count(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <CertificatesSection
        certificates={JSON.parse(JSON.stringify(certificates))}
        isLoading={false}
      />
      {totalPages > 1 && (
        <PaginationRow currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
