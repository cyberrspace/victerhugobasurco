"use client";

import { useState, type FormEvent } from "react";
import { emailConfig, isEmail, sendTemplate } from "@/lib/emailjs";

type State = "idle" | "sending" | "sent" | "error";

/**
 * The client did not want a newsletter — only announcements. The copy says
 * exactly that, so nobody signs up expecting a monthly letter.
 */
export default function AnnouncementForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    if (company) return; // bot
    if (!name.trim()) {
      setState("error");
      setMessage("Add your name so the author knows who signed up.");
      return;
    }
    if (!isEmail(email)) {
      setState("error");
      setMessage("That email address does not look right.");
      return;
    }

    setState("sending");
    setMessage("");

    const result = await sendTemplate(
      emailConfig.signupTemplateId,
      {
        from_name: name.trim(),
        reply_to: email.trim(),
        subscriber_email: email.trim(),
        list: "Announcements",
        submitted_at: new Date().toLocaleString(),
      },
      "vhb:signup",
    );

    if (result.ok) {
      setState("sent");
      setName("");
      setEmail("");
    } else {
      setState("error");
      setMessage(result.message);
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-ember/40 bg-canvas/60 p-8" role="status">
        <span className="eyebrow">You are on the list</span>
        <p className="mt-4 font-display text-[1.4rem] leading-snug text-primary">
          You will hear from Victer when there is a book or a date to announce.
        </p>
        <p className="mt-3 text-[0.92rem] text-muted">
          Nothing else. No monthly letter.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-hairline bg-canvas/70 p-7 backdrop-blur-sm sm:p-9"
    >
      <h3 className="font-display text-[1.6rem] leading-tight text-primary">
        Announcements only
      </h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
        New books and appearance dates. Two or three emails a year, at most.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label className="field-label" htmlFor="ann-name">
            Your name
          </label>
          <input
            id="ann-name"
            name="from_name"
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="ann-email">
            Email
          </label>
          <input
            id="ann-email"
            name="reply_to"
            type="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        {/* Honeypot — hidden from people, irresistible to bots */}
        <div className="absolute left-[-9999px]" aria-hidden>
          <label htmlFor="ann-company">Company</label>
          <input
            id="ann-company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-ember mt-7 w-full"
        disabled={state === "sending"}
      >
        <span>
          {state === "sending" ? "Adding you…" : "Add me to the list"}
        </span>
      </button>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-muted/80">
        Your address is used for announcements from this site only, and never
        shared.
      </p>

      <p
        aria-live="polite"
        className="mt-3 min-h-[1.25rem] text-[0.85rem] text-ember"
      >
        {state === "error" ? message : ""}
      </p>
    </form>
  );
}
