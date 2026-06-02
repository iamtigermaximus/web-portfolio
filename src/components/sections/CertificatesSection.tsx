"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowSquareOut } from "@phosphor-icons/react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { normalizeImageUrl, normalizePdfUrl } from "@/lib/utils";

interface Certificate {
  id: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  skillsLearned: string[];
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const CertCard = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.025) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);

  &:hover {
    border-color: rgba(45, 212, 191, 0.2);
    transform: translateY(-3px);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.4),
      0 0 25px rgba(45, 212, 191, 0.06);
  }
`;

function isPdf(url: string | null): boolean {
  return !!url && /\.pdf(\?.*)?$/i.test(url);
}

const Thumbnail = styled.div<{ $url: string | null }>`
  width: 100%;
  height: 160px;
  background: ${({ $url, theme }) =>
    $url && !isPdf($url)
      ? `url(${$url}) center/cover no-repeat`
      : `linear-gradient(135deg, rgba(167, 139, 250, 0.12), rgba(45, 212, 191, 0.06))`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(6, 11, 20, 0.6), transparent);
    pointer-events: none;
  }
`;

const CertInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CertName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const CertIssuer = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
`;

const CertDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PdfFrame = styled.iframe`
  width: 100%;
  height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ModalImage = styled.div<{ $url: string | null }>`
  width: 100%;
  height: 220px;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ $url, theme }) =>
    $url
      ? `url(${$url}) center/cover no-repeat`
      : `linear-gradient(135deg, rgba(167, 139, 250, 0.12), rgba(45, 212, 191, 0.06))`};
`;

const ModalIssuer = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ModalDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CredentialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface CertificatesSectionProps {
  certificates: Certificate[];
  isLoading: boolean;
  sectionNumber?: string;
}

export default function CertificatesSection({
  certificates,
  isLoading,
  sectionNumber,
}: CertificatesSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { ref, isInView } = useScrollReveal();
  const number = sectionNumber ?? "04 // certs";

  const selected = certificates.find((c) => c.id === selectedId);

  if (isLoading) {
    return (
      <Wrapper>
        <SectionHeading
          title="Certificates"
          subtitle="Professional certifications and courses"
          number={number}
        />
        <EmptyState>
          <Spinner size={32} />
        </EmptyState>
      </Wrapper>
    );
  }

  return (
    <Wrapper id="certificates">
      <SectionHeading
        title="Certificates"
        subtitle="Professional certifications and courses"
        number={number}
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {certificates.length === 0 ? (
          <EmptyState>No certificates added yet.</EmptyState>
        ) : (
          <Grid>
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <CertCard onClick={() => setSelectedId(cert.id)}>
                  <Thumbnail $url={normalizeImageUrl(cert.imageUrl)}>
                    {isPdf(cert.imageUrl) ? "📄" : !cert.imageUrl && "📜"}
                  </Thumbnail>
                  <CertInfo>
                    <CertName>{cert.courseName}</CertName>
                    <CertIssuer>{cert.issuer}</CertIssuer>
                    <CertDate>
                      {format(new Date(cert.issueDate), "MMM yyyy")}
                    </CertDate>
                  </CertInfo>
                </CertCard>
              </motion.div>
            ))}
          </Grid>
        )}
      </motion.div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected?.courseName || ""}
      >
        {selected && (
          <>
            {isPdf(selected.imageUrl) ? (
              <PdfFrame src={normalizePdfUrl(selected.imageUrl)!} title={selected.courseName} />
            ) : (
              <ModalImage $url={normalizeImageUrl(selected.imageUrl)} />
            )}
            <ModalIssuer>{selected.issuer}</ModalIssuer>
            <ModalDate>
              Issued {format(new Date(selected.issueDate), "MMMM yyyy")}
            </ModalDate>
            {selected.skillsLearned.length > 0 && (
              <ModalTags>
                {selected.skillsLearned.map((skill) => (
                  <Badge key={skill} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </ModalTags>
            )}
            {selected.credentialUrl && (
              <CredentialLink
                href={selected.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowSquareOut size={16} weight="bold" />
                View Credential
              </CredentialLink>
            )}
          </>
        )}
      </Modal>
    </Wrapper>
  );
}
