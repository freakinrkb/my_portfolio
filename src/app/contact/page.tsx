"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile, socials } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

/**
 * Contact — validated form that composes a mailto: draft (no backend).
 * Direct email + profile links alongside.
 */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && message.trim().length > 10;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError("Please add your name, a valid email, and a message (10+ characters).");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground";

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Hiring for backend/full-stack roles, or want to discuss payments infrastructure? My inbox is open."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Role, timeline, and what you're building…"
                    rows={5}
                    className={inputClass}
                  />
                </div>
                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={!valid}>
                  <Mail aria-hidden /> Compose email
                </Button>
                <p className="text-xs text-muted-foreground">
                  Opens your mail app addressed to {profile.email} — no data leaves your browser otherwise.
                </p>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Elsewhere</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
              >
                <Mail size={15} aria-hidden /> {profile.email}
              </Link>
              <ul className="mt-4 space-y-2.5 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand"
                    >
                      <span className="font-medium text-foreground">{s.label}</span> {s.username}
                      <ArrowUpRight size={13} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
