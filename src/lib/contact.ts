import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  botcheck: z.string().optional(),
});

export const schema = contactSchema;

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export interface SubmitContactResult {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFieldErrors;
}

export async function submitContact(data: unknown): Promise<SubmitContactResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const errs = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: 'Validation failed.',
      fieldErrors: {
        name: errs.name?.[0],
        email: errs.email?.[0],
        message: errs.message?.[0],
      },
    };
  }

  // Honeypot botcheck validation
  if (parsed.data.botcheck) {
    return {
      ok: true,
      message: 'Transmission successful.',
    };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `Portfolio contact from ${parsed.data.name}`,
        botcheck: '',
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
    });

    const json = await res.json();
    if (json.success) {
      return {
        ok: true,
        message: 'Transmission successful.',
      };
    } else {
      return {
        ok: false,
        message: 'Link failure. Retry suggested.',
      };
    }
  } catch {
    return {
      ok: false,
      message: 'Station offline. Check connection.',
    };
  }
}
