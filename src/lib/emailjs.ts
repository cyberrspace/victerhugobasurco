import emailjs from '@emailjs/browser';

export const emailConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  contactTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? '',
  signupTemplateId: process.env.NEXT_PUBLIC_EMAILJS_SIGNUP_TEMPLATE_ID ?? '',
};

export const isEmailConfigured = (templateId: string) =>
  Boolean(emailConfig.publicKey && emailConfig.serviceId && templateId);

/** Stops a bored visitor from firing the form fifty times. 45s between sends. */
const THROTTLE_MS = 45_000;

const throttled = (key: string) => {
  if (typeof window === 'undefined') return false;
  const last = Number(window.localStorage.getItem(key) ?? 0);
  return Date.now() - last < THROTTLE_MS;
};

const stamp = (key: string) => {
  if (typeof window !== 'undefined') window.localStorage.setItem(key, String(Date.now()));
};

export type SendResult = { ok: true } | { ok: false; message: string };

export async function sendTemplate(
  templateId: string,
  params: Record<string, string>,
  throttleKey: string,
): Promise<SendResult> {
  if (!isEmailConfigured(templateId)) {
    return {
      ok: false,
      message: 'Email is not connected yet. Add your EmailJS keys to .env.local.',
    };
  }

  if (throttled(throttleKey)) {
    return { ok: false, message: 'That just went through. Give it a minute before sending again.' };
  }

  try {
    await emailjs.send(emailConfig.serviceId, templateId, params, {
      publicKey: emailConfig.publicKey,
    });
    stamp(throttleKey);
    return { ok: true };
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 429) {
      return { ok: false, message: 'Too many messages right now. Try again shortly.' };
    }
    return {
      ok: false,
      message: 'The message did not send. Check your connection and try again.',
    };
  }
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
