"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  projectType: "Product design",
  budget: "$10k–$25k",
  message: "",
};

export default function HomePage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.message.trim().length < 20) nextErrors.message = "Share at least 20 characters about the project.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Northstar Studio home">
          <span className="brand-mark">N</span>
          Northstar Studio
        </a>
        <span className="availability"><i /> Taking on one project for Q4</span>
      </header>

      <section className="shell" id="top">
        <aside className="intro">
          <p className="eyebrow">Independent product design · Copenhagen / Remote</p>
          <h1>Good products start with a clear conversation.</h1>
          <p className="lede">Tell us what you are building, where it is stuck, and what a strong outcome looks like.</p>

          <dl className="details">
            <div><dt>Response time</dt><dd>Within 2 business days</dd></div>
            <div><dt>Typical engagement</dt><dd>4–10 focused weeks</dd></div>
            <div><dt>Best fit</dt><dd>Early products and ambitious redesigns</dd></div>
          </dl>
        </aside>

        <section className="card" aria-labelledby="contact-title">
          {submitted ? (
            <div className="success" role="status">
              <span className="success-icon">✓</span>
              <p className="eyebrow">Brief received</p>
              <h2 id="contact-title">Thank you, {form.name.split(" ")[0]}.</h2>
              <p>We will review your note and reply to <strong>{form.email}</strong> within two business days.</p>
              <button type="button" className="secondary" onClick={() => { setSubmitted(false); setForm(initialForm); }}>
                Send another brief
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-heading">
                <p className="eyebrow">Project inquiry</p>
                <h2 id="contact-title">Start with the essentials.</h2>
              </div>

              <div className="two-col">
                <Field label="Your name" error={errors.name}>
                  <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Ada Lovelace" aria-invalid={Boolean(errors.name)} />
                </Field>
                <Field label="Work email" error={errors.email}>
                  <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="ada@company.com" aria-invalid={Boolean(errors.email)} />
                </Field>
              </div>

              <div className="two-col">
                <Field label="Project type">
                  <select value={form.projectType} onChange={(event) => update("projectType", event.target.value)}>
                    <option>Product design</option><option>Design system</option><option>Product strategy</option><option>Website</option>
                  </select>
                </Field>
                <Field label="Expected budget">
                  <select value={form.budget} onChange={(event) => update("budget", event.target.value)}>
                    <option>$5k–$10k</option><option>$10k–$25k</option><option>$25k–$50k</option><option>$50k+</option>
                  </select>
                </Field>
              </div>

              <Field label="What are you hoping to make?" error={errors.message}>
                <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="A little context, the main challenge, and what success looks like…" rows={5} aria-invalid={Boolean(errors.message)} />
              </Field>

              <div className="submit-row">
                <p>By sending this, you agree that we may reply about your project.</p>
                <button type="submit">Send project brief <span aria-hidden="true">↗</span></button>
              </div>
            </form>
          )}
        </section>
      </section>

      <footer><span>© 2026 Northstar Studio</span><a href="mailto:hello@northstar.studio">hello@northstar.studio</a></footer>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}
