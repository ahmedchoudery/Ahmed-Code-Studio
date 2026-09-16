import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContact, contactSchema } from '@/lib/contact';

describe('submitContact', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Validation Failure', () => {
    it('returns validation errors for empty submissions without calling fetch', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await submitContact({ name: '', email: '', message: '' });

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result.ok).toBe(false);
      expect(result.message).toBe('Validation failed.');
      expect(result.fieldErrors?.name).toBe('Name must be at least 2 characters.');
      expect(result.fieldErrors?.email).toBe('Please enter a valid email address.');
      expect(result.fieldErrors?.message).toBe('Message must be at least 10 characters.');
    });

    it('returns validation errors when fields are undefined', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await submitContact({});

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result.ok).toBe(false);
      expect(result.message).toBe('Validation failed.');
      expect(result.fieldErrors?.name).toBeDefined();
      expect(result.fieldErrors?.email).toBeDefined();
      expect(result.fieldErrors?.message).toBeDefined();
    });

    it('returns validation error when email is invalid', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await submitContact({
        name: 'Jane Doe',
        email: 'not-an-email',
        message: 'This is a valid long enough message.',
      });

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result.ok).toBe(false);
      expect(result.fieldErrors?.email).toBe('Please enter a valid email address.');
      expect(result.fieldErrors?.name).toBeUndefined();
    });
  });

  describe('Successful Submission', () => {
    it('submits valid data to Web3Forms and returns success', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ success: true }))
      );

      const validData = {
        name: 'Muhammad Ahmed',
        email: 'client@example.com',
        message: 'I want to build an e-commerce platform for my store.',
      };

      const result = await submitContact(validData);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toBe('https://api.web3forms.com/submit');
      expect(options?.method).toBe('POST');
      expect(JSON.parse(options?.body as string)).toMatchObject({
        name: validData.name,
        email: validData.email,
        message: validData.message,
        botcheck: '',
      });

      expect(result.ok).toBe(true);
      expect(result.message).toBe('Transmission successful.');
    });

    it('silently ignores spam bots when honeypot botcheck is filled', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');

      const spamData = {
        name: 'Spam Bot',
        email: 'bot@spam.com',
        message: 'Buy our fake products now and save money!',
        botcheck: 'automated-bot-content',
      };

      const result = await submitContact(spamData);

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result.ok).toBe(true);
      expect(result.message).toBe('Transmission successful.');
    });
  });

  describe('API and Network Failures', () => {
    it('handles API rejection (success: false) gracefully', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ success: false, message: 'Invalid API key' }))
      );

      const result = await submitContact({
        name: 'Valid Name',
        email: 'valid@example.com',
        message: 'This is a valid long enough message.',
      });

      expect(result.ok).toBe(false);
      expect(result.message).toBe('Link failure. Retry suggested.');
    });

    it('handles network failure (fetch throws) gracefully', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

      const result = await submitContact({
        name: 'Valid Name',
        email: 'valid@example.com',
        message: 'This is a valid long enough message.',
      });

      expect(result.ok).toBe(false);
      expect(result.message).toBe('Station offline. Check connection.');
    });
  });
});
