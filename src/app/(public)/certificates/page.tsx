"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CertificatesSection from "@/components/sections/CertificatesSection";

interface Certificate {
  id: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  skillsLearned: string[];
}

async function fetchCertificates(): Promise<Certificate[]> {
  const res = await fetch("/api/public/certificates");
  if (!res.ok) throw new Error("Failed to fetch certificates");
  return res.json();
}

export default function CertificatesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["public-certificates"],
    queryFn: fetchCertificates,
    enabled: mounted,
  });

  return <CertificatesSection certificates={certificates} isLoading={isLoading || !mounted} />;
}
