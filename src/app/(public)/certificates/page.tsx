import React from "react";
import { prisma } from "@/lib/prisma";
import CertificatesSection from "@/components/sections/CertificatesSection";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
  });

  return <CertificatesSection certificates={JSON.parse(JSON.stringify(certificates))} isLoading={false} />;
}
