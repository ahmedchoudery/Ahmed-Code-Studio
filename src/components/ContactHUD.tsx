'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { z } from 'zod';
import { useHUDStore } from '../store/useHUDStore';
import { linkedinIcon, mailIcon, whatsappIcon } from '../data/projects';

type FormStatus = 'idle' | 'pending' | 'success' | 'error';

const schema = z.object({
  name:    z.string().min(2,  'Name must be at least 2 characters.'),
  email:   z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export function ContactHUD() {
  const isOpen  = useHUDStore(state => state.view === 'CONTACT');
  const setView = useHUDStore(state => state.setView);
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [status,      setStatus]      = useState<FormStatus>('idle');
  const [serverMsg,   setServerMsg]   = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const whatsappUrl = "https://wa.me/923174307043";
  const gmailUrl    = "mailto:ahmedchoudery30@gmail.com";

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setView('MAIN');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setView]);

  useEffect(() => {
    if (!overlayRef.current || !formRef.current) return;
    if (isOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(formRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => { setView('MAIN'); setTimeout(() => setStatus('idle'), 350); }, 3000);
    return () => clearTimeout(t);
  }, [status, setView]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd   = new FormData(form);
    const parsed = schema.safeParse({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message') });

    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors;
      setFieldErrors({ name: errs.name?.[0], email: errs.email?.[0], message: errs.message?.[0] });
      return;
    }

    setFieldErrors({});
    setStatus('pending');

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Portfolio contact from ${parsed.data.name}`,
          botcheck: '',
          ...parsed.data,
        }),
      });
      const json = await res.json();
      if (json.success) { setStatus('success'); setServerMsg('Transmission successful.'); form.reset(); }
      else              { setStatus('error');   setServerMsg('Link failure. Retry suggested.'); }
    } catch {
      setStatus('error');
      setServerMsg('Station offline. Check connection.');
    }
  }

  return (
    <div
      ref={overlayRef}
      className={`contact-overlay ${isOpen ? 'active' : ''}`}
      onClick={() => setView('MAIN')}
    >
      <div
        ref={formRef}
        className="contact-modal glassmorphism"
        onClick={e => e.stopPropagation()}
      >
        <header className="modal-header" style={{ marginBottom: '30px' }}>
          <div className="header-meta">
            <h2 className="display-title">Connect with Me</h2>
          </div>
          <button className="close-btn" onClick={() => setView('MAIN')}>
            ESC
          </button>
        </header>

        {status === 'success' ? (
          <div className="status-view success">
            <div className="status-icon">✓</div>
            <p className="status-text">{serverMsg}</p>
            <p className="status-meta">SECURE CHANNEL ESTABLISHED</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="contact-form">
              {status === 'error' && (
                <div className="form-error">
                  {serverMsg}
                </div>
              )}

              {(['name','email','message'] as const).map(field => (
                <div key={field} className="form-group">
                  <label 
                    htmlFor={`c-${field}`} 
                    className="form-label" 
                    style={{ 
                      color: '#FFFFFF', 
                      opacity: 1, 
                      fontWeight: '700',
                      textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {field.toUpperCase()}
                  </label>
                  {field === 'message' ? (
                    <textarea 
                      id={`c-${field}`} 
                      name={field} 
                      rows={4} 
                      className="form-input" 
                      required 
                      placeholder=" "
                    />
                  ) : (
                    <input 
                      id={`c-${field}`} 
                      name={field} 
                      type={field === 'email' ? 'email' : 'text'} 
                      className="form-input" 
                      required 
                      placeholder=" "
                    />
                  )}
                  {fieldErrors[field] && <p className="field-error">{fieldErrors[field]}</p>}
                </div>
              ))}

              <button type="submit" disabled={status === 'pending'} className="btn-primary full-width">
                {status === 'pending' ? 'TRANSMITTING' : 'INITIATE CONTACT'}
              </button>
            </form>

            <div className="modal-alternatives" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ 
                fontSize: '0.85rem', 
                fontFamily: 'var(--f-mono)', 
                fontWeight: 'bold', 
                letterSpacing: '0.15em', 
                color: '#FFFFFF', 
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}>
                Direct Channels
              </span>
              
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ flex: 1, fontSize: '0.75rem', minHeight: '52px', gap: '12px', background: 'rgba(37, 211, 102, 0.1)', borderColor: 'rgba(37, 211, 102, 0.4)', color: '#FFFFFF' }}
                >
                  <span dangerouslySetInnerHTML={{ __html: whatsappIcon }} style={{ width: '20px', height: '20px', color: '#25D366' }} />
                  WhatsApp
                </a>

                <a 
                  href="https://www.linkedin.com/in/ahmedcodestudio/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ flex: 1, fontSize: '0.75rem', minHeight: '52px', gap: '12px', background: 'rgba(0, 119, 181, 0.1)', borderColor: 'rgba(0, 119, 181, 0.4)', color: '#FFFFFF' }}
                >
                  <span dangerouslySetInnerHTML={{ __html: linkedinIcon }} style={{ width: '20px', height: '20px', color: '#0077B5' }} />
                  LinkedIn
                </a>
              </div>
            </div>

            <p className="privacy-notice" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2rem', textAlign: 'center', opacity: 0.5, fontStyle: 'italic' }}>
              Transmission is encrypted. Your data is used exclusively for response.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
