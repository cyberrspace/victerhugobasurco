"use client";

import { useState, type FormEvent } from "react";
import { emailConfig, isEmail, sendTemplate } from "@/lib/emailjs";

type State = "idle" | "sending" | "sent" | "error";

const reasons = [
  "A note about a book",
  "Event or speaking invitation",
  "Press or interview",
  "Rights and publishing",
  "Something else",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: reasons[0],
    message: "",
    website: "", // honeypot
  });
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (form.website) return; // bot

    if (!form.name.trim())
      return fail("Add your name so Victer knows who is writing.");
    if (!isEmail(form.email))
      return fail("That email address does not look right.");
    if (form.message.trim().length < 12)
      return fail("Add a little more to your message.");

    setState("sending");
    setError("");

    const result = await sendTemplate(
      emailConfig.contactTemplateId,
      {
        from_name: form.name.trim(),
        reply_to: form.email.trim(),
        subject: form.reason,
        message: form.message.trim(),
        submitted_at: new Date().toLocaleString(),
      },
      "vhb:contact",
    );

    if (result.ok) {
      setState("sent");
      setForm({
        name: "",
        email: "",
        reason: reasons[0],
        message: "",
        website: "",
      });
    } else {
      setState("error");
      setError(result.message);
    }
  }

  function fail(msg: string) {
    setState("error");
    setError(msg);
  }

  if (state === "sent") {
    return (
      <div className="border border-ember/40 bg-canvas/60 p-10" role="status">
        <span className="eyebrow">Message sent</span>
        <p className="mt-4 font-display text-[1.7rem] leading-snug text-primary">
          It is on its way to Victer.
        </p>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
          He reads everything that arrives here himself, so a reply can take a
          little while. Thank you for writing.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link-more mt-8"
        >
          <span>Send another</span>
          <span className="arrow" aria-hidden>
            &rarr;
          </span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="c-name">
            Your name
          </label>
          <input
            id="c-name"
            className="field"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            className="field"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="c-reason">
          What is this about?
        </label>
        <select
          id="c-reason"
          className="field"
          value={form.reason}
          onChange={set("reason")}
        >
          {reasons.map((r) => (
            <option key={r} value={r} className="bg-canvas">
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message"
          rows={7}
          className="field resize-y"
          value={form.message}
          onChange={set("message")}
          placeholder="Write as much as you like."
          required
        />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="c-website">Website</label>
        <input
          id="c-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="btn-ember"
          disabled={state === "sending"}
        >
          <span>{state === "sending" ? "Sending…" : "Send message"}</span>
        </button>
        <p aria-live="polite" className="text-[0.88rem] text-ember">
          {state === "error" ? error : ""}
        </p>
      </div>
    </form>
  );
}
