'use client';

import React, { useState } from 'react';
import { submitContact, type ContactFieldErrors } from '../lib/contact';

export default function ClientContactForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      name: fd.get('name')?.toString() || '',
      email: fd.get('email')?.toString() || '',
      message: fd.get('message')?.toString() || '',
      botcheck: fd.get('botcheck')?.toString() || '',
    };

    setFieldErrors({});
    setStatus('pending');

    const result = await submitContact(data);

    if (result.ok) {
      setStatus('success');
      setServerMsg(result.message);
      form.reset();
    } else {
      setStatus('error');
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      setServerMsg(result.message);
    }
  }

  return (
    <div className="client-contact-wrapper">
      <style>{`
        .client-contact-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .client-contact-wrapper {
            grid-template-columns: 1.4fr 1fr;
            align-items: start;
          }
        }

        .client-contact-card {
          background: rgba(26, 20, 16, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 2.5rem 2rem;
        }

        .client-contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .contact-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .contact-field-label {
          font-family: var(--f-mono, monospace);
          font-size: 0.78rem;
          color: var(--amber, #C09218);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .contact-field-input,
        .contact-field-textarea {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          padding: 0.8rem 1rem;
          color: var(--warm-white, #F0E4D0);
          font-family: var(--f-body, sans-serif);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .contact-field-input:focus,
        .contact-field-textarea:focus {
          border-color: var(--amber, #C09218);
        }

        .contact-inline-error {
          font-family: var(--f-mono, monospace);
          font-size: 0.75rem;
          color: #ff6b6b;
          margin: 0.2rem 0 0 0;
        }

        .contact-submit-btn {
          font-family: var(--f-mono, monospace);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.95rem 1.8rem;
          background: var(--amber, #C09218);
          color: #000000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.15s ease;
          margin-top: 0.5rem;
        }

        .contact-submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .contact-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .contact-success-state {
          padding: 2.5rem 1.5rem;
          text-align: center;
          background: rgba(192, 146, 24, 0.08);
          border: 1px solid rgba(192, 146, 24, 0.3);
          border-radius: 6px;
        }

        .contact-success-title {
          font-family: var(--f-display, serif);
          font-size: 1.8rem;
          color: var(--amber, #C09218);
          margin-bottom: 0.5rem;
        }

        .contact-success-desc {
          font-size: 0.95rem;
          color: var(--linen, #C8B298);
        }

        .contact-alternate-panel {
          background: rgba(26, 20, 16, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-alternate-title {
          font-family: var(--f-display, serif);
          font-size: 1.6rem;
          font-weight: 500;
          color: var(--warm-white, #F0E4D0);
          margin: 0;
        }

        .contact-alternate-text {
          font-size: 0.92rem;
          color: var(--linen, #C8B298);
          line-height: 1.7;
          margin: 0;
        }

        .contact-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: rgba(37, 211, 102, 0.12);
          border: 1px solid rgba(37, 211, 102, 0.5);
          color: #25D366;
          font-family: var(--f-mono, monospace);
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 0.9rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .contact-whatsapp-btn:hover {
          background: rgba(37, 211, 102, 0.22);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Main Plain Contact Form Card */}
      <div className="client-contact-card">
        {status === 'success' ? (
          <div className="contact-success-state">
            <h3 className="contact-success-title">Message Received</h3>
            <p className="contact-success-desc">
              Thank you for reaching out. I have received your project details and will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="client-contact-form" noValidate>
            {status === 'error' && !fieldErrors.name && !fieldErrors.email && !fieldErrors.message && (
              <p className="contact-inline-error" style={{ fontSize: '0.85rem' }}>
                {serverMsg}
              </p>
            )}

            {/* Honeypot field */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <div className="contact-field-group">
              <label htmlFor="client-contact-name" className="contact-field-label">
                Name
              </label>
              <input
                id="client-contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name or company"
                className="contact-field-input"
              />
              {fieldErrors.name && (
                <p className="contact-inline-error">{fieldErrors.name}</p>
              )}
            </div>

            <div className="contact-field-group">
              <label htmlFor="client-contact-email" className="contact-field-label">
                Email
              </label>
              <input
                id="client-contact-email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                className="contact-field-input"
              />
              {fieldErrors.email && (
                <p className="contact-inline-error">{fieldErrors.email}</p>
              )}
            </div>

            <div className="contact-field-group">
              <label htmlFor="client-contact-message" className="contact-field-label">
                Project Description
              </label>
              <textarea
                id="client-contact-message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your e-commerce store, booking system, or timeline..."
                className="contact-field-textarea"
              />
              {fieldErrors.message && (
                <p className="contact-inline-error">{fieldErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'pending'}
              className="contact-submit-btn"
            >
              {status === 'pending' ? 'Sending Message...' : 'Send Project Inquiry'}
            </button>
          </form>
        )}
      </div>

      {/* Alternate Contact Method: WhatsApp Panel */}
      <aside className="contact-alternate-panel" aria-label="Alternate Contact Method">
        <h3 className="contact-alternate-title">Prefer Instant Messaging?</h3>
        <p className="contact-alternate-text">
          If you have immediate questions, project briefs, or want to discuss pricing and scope quickly, feel free to reach out directly on WhatsApp.
        </p>
        <a
          href="https://wa.me/923174307043"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-whatsapp-btn"
        >
          Chat on WhatsApp
        </a>
      </aside>
    </div>
  );
}
