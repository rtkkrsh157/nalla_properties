'use client'

import { useState } from 'react'
import { ArrowUpRight, Building2, Check, ChevronDown, CircleCheck, ClipboardCheck, House, Mail, MapPin, Menu, Phone, ShieldCheck, Sparkles, X } from 'lucide-react'

const services = [
  ['01', 'NRI Property Management', 'Complete remote property support for NRIs who need trusted professionals to monitor, maintain and manage your property in India.', ShieldCheck],
  ['02', 'Property Management', 'End-to-end oversight to help maintain your property’s condition, value and day-to-day requirements.', Building2],
  ['03', 'Property Monitoring & Inspection', 'Regular property visits and inspections to identify maintenance, security and repair needs early.', ClipboardCheck],
  ['04', 'Plot Monitoring & Maintenance', 'Ongoing care for vacant plots and land, helping protect your property while you are away.', MapPin],
  ['05', 'Rental & Tenant Management', 'Tenant coordination, property visits and rent follow-ups that make rental ownership simpler.', House],
  ['06', 'Buy, Sell, Lease & Rent', 'Property guidance and coordination to help you navigate transactions with greater clarity.', ArrowUpRight],
  ['07', 'Building Repair & Maintenance', 'Reliable coordination for routine work, repairs and essential property upkeep.', ShieldCheck],
  ['08', 'Property Documentation', 'Systematic coordination of property-related documents and processes, handled with care.', CircleCheck],
  ['09', 'Investment & Consulting', 'Property-focused guidance to help evaluate opportunities, understand potential returns and make informed decisions.', Sparkles],
] as const

const reasons = [
  ['Local presence', 'We’re here when you can’t be.'],
  ['Regular updates', 'Stay informed about your property’s condition and ongoing work.'],
  ['Responsible coordination', 'Maintenance, repairs and vendors handled with care.'],
  ['Clear communication', 'No confusion. No unnecessary chasing. Just straightforward updates.'],
] as const

const process = [
  ['01', 'Tell us what you need', 'Share your property, goals and preferred level of support.'],
  ['02', 'Receive a clear plan', 'We recommend the right services, outline the next steps and keep expectations clear from the beginning.'],
  ['03', 'Stay confidently informed', 'Our team coordinates the details and keeps you updated.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("Sending...");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const object = Object.fromEntries(formData.entries());

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      const data = await response.json();

      console.log("Contact API status:", response.status);
      console.log("Contact API response:", data);

      if (data.success) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Nalla Properties home"><span className="brand-mark">N</span><span>Nalla <em>Properties</em></span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#process" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="tel:+919443301698">Speak with us <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Property, thoughtfully looked after</p>
          <h1>Where your <i>property</i> feels at home.</h1>
          <p className="hero-lede">Trusted property management and real estate support for families, property owners and NRIs across Coimbatore.</p>
          <div className="hero-actions"><a className="button button-dark" href="#contact">Start a conversation <ArrowUpRight size={17} /></a><a className="text-link" href="#services">Explore our services <span>↓</span></a></div>
          <div className="hero-proof"><div className="avatars"><span>NP</span><span>RM</span><span>AK</span></div><p><strong>People-first property care.</strong><br />Built on trust, clarity and consistency.</p></div>
        </div>
        <div className="hero-visual reveal delay-1"><div className="hero-image"><div className="image-texture" /><div className="hero-location"><MapPin size={15} /> Coimbatore, India</div><div className="hero-card"><span>THE NALLA STANDARD</span><strong>Property care that<br /><i>goes beyond basics.</i></strong><a href="#about">Discover what makes Nalla different <ArrowUpRight size={15} /></a></div></div><div className="vertical-note">EST. 2024 <span>—</span> BUILT ON TRUST</div></div>
      </section>

      <div className="trust-strip"><div className="section-shell trust-inner"><span>Property care, made personal</span><span>01 <b>—</b> For owners near and far</span><span>02 <b>—</b> Local expertise</span><span>03 <b>—</b> Clear communication</span></div></div>

      <section id="about" className="about section-shell"><div className="section-label">01 / A better way to own property</div><div className="about-grid"><div><h2>Good property care is <i>quietly powerful.</i></h2></div><div className="about-copy"><p>At Nalla Properties, we believe property management is more than maintenance. It is about protecting what you have built, being present when you cannot be, and making every decision feel a little easier.</p><p>From a family home to an investment plot, we bring local knowledge, responsible coordination and genuine care to every property we look after — especially when you can&apos;t be there yourself.</p><a className="text-link" href="#contact">Get to know Nalla <ArrowUpRight size={16} /></a></div></div></section>

      <section id="services" className="services-section"><div className="section-shell"><div className="section-heading"><div><div className="section-label light">02 / What we do</div><h2>Support for every<br /><i>side of property ownership.</i></h2></div><p>Thoughtful, practical services designed around the way real people own property today.</p></div><div className="services-grid">{services.map(([number, title, description, Icon]) => <article className="service-card" key={number}><div className="service-top"><span>{number}</span><Icon size={21} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></a></article>)}</div></div></section>

      <section className="why-section section-shell"><div className="section-label">03 / Why Nalla</div><div className="why-grid"><div><h2>Because property deserves someone who <i>cares.</i></h2></div><div className="why-copy"><p>When you&apos;re managing property from a distance, small things can quickly become big problems. We provide the local presence, coordination and communication you need to stay informed and in control.</p><div className="reason-grid">{reasons.map(([title, description]) => <div className="reason" key={title}><h3>{title}</h3><p>{description}</p></div>)}</div></div></div></section>

      <section className="nri-section section-shell"><div className="nri-panel"><div className="nri-copy"><p className="eyebrow gold"><span /> For NRIs who call Coimbatore home</p><h2>Distance should never<br />mean <i>disconnection.</i></h2><p>When your property is miles away, having the right local partner makes all the difference. We take care of the details on the ground, keep you informed and help you stay connected to your property from wherever you are.</p><a className="button button-gold" href="https://wa.me/919443301698">Talk to us on WhatsApp <ArrowUpRight size={17} /></a></div><div className="nri-benefits"><div className="orbit-mark">N</div>{['Regular property visits & updates', 'Maintenance and vendor coordination', 'Tenant and rental support', 'A trusted point of contact in Coimbatore'].map(item => <div className="benefit" key={item}><Check size={16} /><span>{item}</span></div>)}</div></div></section>

      <section id="process" className="process section-shell"><div className="section-label">04 / Our approach</div><div className="process-heading"><h2>Simple, transparent,<br /><i>dependable.</i></h2><p>No jargon. No chasing. Just a thoughtful process and a team that does what it says.</p></div><div className="process-grid">{process.map(([number, title, description]) => <div className="process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></section>

      <section id="contact" className="contact section-shell"><div className="contact-panel"><div><p className="eyebrow"><span /> Let’s look after it together</p><h2>Your Property<br /><i>Our Responsibility.</i></h2><p className="contact-note">Tell us a little about your property and what you need. We'll get back to you with a clear next step.</p><div className="contact-details"><a href="tel:+919443301698"><Phone size={17} /> +91 94433 01698</a><a href="mailto:namopublishers@gmail.com"><Mail size={17} /> namopublishers@gmail.com</a></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Your name<input name="name" placeholder="Enter your name" required disabled={status === 'Sending...'} /></label><label>Phone number or email<input name="contact" placeholder="Your preferred contact details" required disabled={status === 'Sending...'} /></label><label>Service required<select name="service" defaultValue="" disabled={status === 'Sending...'}><option value="" disabled>Select a service</option>{services.map(([number, title]) => <option value={title} key={number}>{title}</option>)}</select></label><label>How can we help?<textarea name="message" placeholder="Tell us about your property..." rows={3} disabled={status === 'Sending...'} /></label><button className="button button-dark" type="submit" disabled={status === 'Sending...'}>{status === 'Sending...' ? 'Sending...' : 'Send an enquiry'} {status !== 'Sending...' && <ArrowUpRight size={17} />}</button>{status && status !== 'Sending...' && <p style={{ color: status.includes('success') ? 'green' : 'var(--rust)', fontSize: '13px', marginTop: '5px' }}>{status}</p>}</form></div></section>

      <footer className="footer"><div className="section-shell footer-grid"><div><a className="brand brand-light" href="#top"><span className="brand-mark">N</span><span>Nalla <em>Properties</em></span></a><p>Property care, made personal.<br />Coimbatore, India.<br />Trusted property care in Coimbatore, for owners near and far.</p></div><div className="footer-links"><a href="#about">About</a><a href="#services">Services</a><a href="#process">Our approach</a><a href="#contact">Contact</a></div><div className="footer-contact"><span>Start a conversation</span><a href="mailto:namopublishers@gmail.com">namopublishers@gmail.com</a><a href="tel:+919443301698">+91 94433 01698</a></div></div><div className="section-shell footer-bottom"><span>© 2024 Nalla Properties</span><span>Made with care in Coimbatore</span></div></footer>
    </main>
  )
}
