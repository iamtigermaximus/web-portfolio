"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { contactSchema, ContactInput } from "@/lib/validations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Wrapper = styled.section`
  max-width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  min-height: 140px;
  resize: vertical;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const { ref, isInView } = useScrollReveal();

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      toast.success("Message sent! I'll get back to you soon.", {
        style: {
          background: "#1e293b",
          color: "#f8fafc",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
      reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message",
        {
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }
      );
    }
  }

  return (
    <Wrapper id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a question or want to work together? Send me a message."
        align="center"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <GlassCard>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div>
              <TextArea
                placeholder="Tell me about your project or question..."
                aria-label="Message"
                {...register("message")}
              />
              {errors.message && (
                <ErrorText>{errors.message.message}</ErrorText>
              )}
            </div>
            <Button type="submit" size="lg" loading={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        </GlassCard>
      </motion.div>
    </Wrapper>
  );
}
