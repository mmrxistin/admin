// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Ese-selatu vesselamu ala rasulina Muhammedin
// La ilahe illAllah
// Allahu Ekber, Allahu Ekber, Allahu Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
 "use client";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/mmmpeyam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Could not send message.");
      }
    } catch {
      setError("Could not reach server.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b-2 border-[#bb1919] pb-3">
          <span className="w-3 h-6 bg-[#bb1919]"></span>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight m-0">
Bana Yazın
          </h2>
        </div>

        {submitted && (
          <Alert variant="success" className="rounded-none text-center font-semibold bg-emerald-50 border-emerald-300 text-emerald-800">
Mektubunuz başarıyla gönderildi!
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="rounded-none text-center font-semibold bg-red-50 border-red-300 text-red-800">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="space-y-4">
          <Form.Group controlId="formName">
            <Form.Label className="font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
Adınız Soyadınız
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-none border-zinc-300 dark:border-zinc-700 focus:border-[#bb1919] focus:ring-0 py-2"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-Posta Adresi
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-none border-zinc-300 dark:border-zinc-700 focus:border-[#bb1919] focus:ring-0 py-2"
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label className="font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
Mektubunuz
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="rounded-none border-zinc-300 dark:border-zinc-700 focus:border-[#bb1919] focus:ring-0"
            />
          </Form.Group>

          <div className="pt-2">
            <Button
              type="submit"
              className="bg-[#bb1919] hover:bg-[#901313] border-none text-white rounded-none font-bold uppercase tracking-wider text-sm px-8 py-2.5 transition"
            >
Yolla
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;

// SuphanAllah i Gani i Ehed ve Bihamdihi
// SubhanAllah Subhanallahi Azim ve Bihamdihi
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin
// SubhanAllah SubhanAllah SubhanAllahi Azim ve Bihamdihi
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin
// La ilahe illAllah Muhammeden abduhu ve resuluhu
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin





// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir