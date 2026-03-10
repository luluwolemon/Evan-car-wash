"use client";
import { useMemo, useState } from "react";

export default function CarWashWebsite() {
  const services = [
    {
      title: "Basic Wash",
      description: "Quick exterior wash for a clean everyday finish.",
      price: 10,
    },
    {
      title: "Interior Clean",
      description: "Vacuum, wipe-down, and interior refresh for a cleaner cabin.",
      price: 15,
    },
    {
      title: "Full Wash",
      description: "Inside-and-out wash for a complete clean at the best value.",
      price: 25,
    },
  ];

  const addOns = [
    { label: "SUV / Large Vehicle", price: 10 },
    { label: "Pet Hair Removal", price: 15 },
    { label: "Seat Shampoo", price: 20 },
    { label: "Express Wax", price: 18 },
  ];

  const testimonials = [
  {
    name: "Jason L.",
    quote: "Super easy booking and my car looked brand new after the full detail.",
  },
  {
    name: "Maya T.",
    quote: "Fast service, fair price, and the interior was way cleaner than I expected.",
  },
  {
    name: "Daniel C.",
    quote: "The online quote made it really simple. I booked in less than a minute.",
  },
];

  const faq = [
    {
      question: "How long does a wash take?",
      answer: "Most appointments take 30 to 90 minutes depending on the package and vehicle size.",
    },
    {
      question: "Do you accept same-day bookings?",
      answer: "Yes, when slots are available. We recommend booking early for weekends.",
    },
    {
      question: "Do you service SUVs and trucks?",
      answer: "Yes. Larger vehicles may include a small upcharge depending on the package.",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Basic Wash");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I can help with pricing, booking, and service questions.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const selectedBasePrice =
    services.find((service) => service.title === selectedService)?.price || 0;

  const addOnTotal = useMemo(() => {
    return selectedAddOns.reduce((sum, label) => {
      const match = addOns.find((item) => item.label === label);
      return sum + (match?.price || 0);
    }, 0);
  }, [selectedAddOns]);

  const totalEstimate = selectedBasePrice + addOnTotal;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setBookingForm((current) => ({ ...current, [name]: value }));
  }

  function scrollToBooking(serviceTitle) {
    setSelectedService(serviceTitle);
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function toggleAddOn(label) {
    setSelectedAddOns((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function resetBooking() {
    setSubmitted(false);
    setSelectedService("Basic Wash");
    setSelectedAddOns([]);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });
  }

  function handleChatSend() {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", text: chatInput };
    const lower = chatInput.toLowerCase();
    let reply = "Thanks for your message. Our team will get back to you shortly.";

    if (lower.includes("price") || lower.includes("cost") || lower.includes("多少钱")) {
      reply = `Our ${selectedService} currently starts at $${selectedBasePrice}. Your current estimated total with selected add-ons is $${totalEstimate}.`;
    } else if (lower.includes("book") || lower.includes("appointment") || lower.includes("预约")) {
      reply = "You can book directly in the form below. Choose a service, add-ons, date, and submit your request.";
    } else if (lower.includes("hours") || lower.includes("open")) {
      reply = "We’re open Monday to Sunday, 8:00 AM to 7:00 PM.";
    } else if (lower.includes("location") || lower.includes("where")) {
      reply = "We’re based in Surrey and serve nearby areas.";
    }

    setChatMessages((current) => [
      ...current,
      userMessage,
      { role: "assistant", text: reply },
    ]);
    setChatInput("");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Luc&Evan Car Wash</h1>
            <p className="text-xs text-slate-500">Affordable. Fast. Local.</p>
          </div>

          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-sky-600">Home</a>
            <a href="#services" className="hover:text-sky-600">Services</a>
            <a href="#pricing" className="hover:text-sky-600">Pricing</a>
            <a href="#booking" className="hover:text-sky-600">Booking</a>
            <a href="#faq" className="hover:text-sky-600">FAQ</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold md:hidden"
            >
              Menu
            </button>
            <a
              href="#booking"
              className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Book Now
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#booking" onClick={() => setMobileMenuOpen(false)}>Booking</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="border-b border-slate-100 bg-slate-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex flex-wrap gap-4 text-slate-200">
              <span>✓ Same-day appointments</span>
              <span>✓ Transparent pricing</span>
              <span>✓ Mobile-friendly booking</span>
            </div>
            <a href="#booking" className="font-semibold text-sky-300 hover:text-sky-200">Reserve your spot today</a>
          </div>
        </section>
        <section id="home" className="border-b border-slate-100 bg-gradient-to-b from-sky-50 via-white to-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center lg:px-8 lg:py-24">
            <div>
              <p className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                Modern Mobile Car Wash Experience
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Premium car care with smarter online booking.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Fast booking, transparent pricing, cleaner cars, and a modern customer experience built for mobile.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#booking"
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  Schedule a Wash
                </a>
                <a
                  href="#pricing"
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-sky-600 hover:text-sky-600"
                >
                  Get Pricing
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Fast Turnaround</p>
                  <p className="mt-2 text-2xl font-bold">30–90 min</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Customer Rating</p>
                  <p className="mt-2 text-2xl font-bold">4.9/5</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Easy Booking</p>
                  <p className="mt-2 text-2xl font-bold">24/7</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Starting From</p>
                  <p className="mt-2 text-2xl font-bold">$10</p>
                </div>
                <div className="rounded-2xl bg-sky-600 p-5 text-white sm:col-span-2">
                  <p className="text-sm font-semibold text-sky-100">Smart estimate preview</p>
                  <p className="mt-2 text-2xl font-bold">Your current quote: ${totalEstimate}</p>
                  <p className="mt-2 text-sm text-sky-100">Update your service and add-ons in the booking section below.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Why choose us</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">Built for trust and convenience.</h3>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Average booking time</p>
              <p className="mt-2 text-3xl font-bold">Under 60 sec</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Repeat customer rate</p>
              <p className="mt-2 text-3xl font-bold">72%</p>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Services</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight">Built for everyday drivers and premium care.</h3>
            <p className="mt-4 text-slate-600">
              Choose the service that fits your vehicle, your time, and your budget.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                  selectedService === service.title
                    ? "border-sky-600 bg-sky-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-xl font-semibold">{service.title}</h4>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                    ${service.price}+
                  </span>
                </div>
                <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
                <button
                  onClick={() => scrollToBooking(service.title)}
                  className="mt-6 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Select & Book
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Pricing</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">Simple pricing, no surprises.</h3>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
                <div>Package</div>
                <div>What’s Included</div>
                <div className="text-right">Price</div>
              </div>
              {services.map((service) => (
                <div key={service.title} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-6 py-5 text-sm last:border-b-0 sm:text-base">
                  <div className="font-semibold text-slate-900">{service.title}</div>
                  <div className="text-slate-600">{service.description}</div>
                  <div className="text-right font-semibold text-slate-900">${service.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-xl font-semibold">Popular Add-Ons</h4>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {addOns.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-slate-600">+${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.05fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Booking</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">Book your wash in under a minute.</h3>
              <p className="mt-4 text-slate-600">
                Pick a package, choose add-ons, and send your request. This version also includes a smarter quote preview.
              </p>

              <div className="mt-6 rounded-3xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Live estimate</p>
                <p className="mt-3 text-lg text-slate-300">Selected service</p>
                <p className="text-2xl font-bold">{selectedService}</p>
                <p className="mt-4 text-lg text-slate-300">Add-ons</p>
                <p className="text-base text-white">{selectedAddOns.length ? selectedAddOns.join(", ") : "No add-ons selected"}</p>
                <p className="mt-6 text-lg text-slate-300">Estimated total</p>
                <p className="text-4xl font-bold text-sky-300">${totalEstimate}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {submitted ? (
                <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Booking request sent</p>
                  <h4 className="mt-2 text-2xl font-bold text-slate-900">Thanks — we received your request.</h4>
                  <p className="mt-3 leading-7 text-slate-600">
                    A confirmation email or text would be sent in the live version. Your estimated total is <span className="font-semibold text-slate-900">${totalEstimate}</span>.
                  </p>
                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700 ring-1 ring-emerald-100">
                    <p><span className="font-semibold">Booking for:</span> {bookingForm.name || "Customer"}</p>
                    <p><span className="font-semibold">Contact:</span> {bookingForm.email || "—"}</p>
                    <p><span className="font-semibold">Time:</span> {bookingForm.date || "—"} {bookingForm.time || ""}</p>
                  </div>
                  <button
                    onClick={resetBooking}
                    className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Create Another Booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="name" value={bookingForm.name} onChange={handleInputChange} className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" type="text" placeholder="Full Name" required />
                    <input name="phone" value={bookingForm.phone} onChange={handleInputChange} className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" type="tel" placeholder="Phone Number" required />
                  </div>
                  <input name="email" value={bookingForm.email} onChange={handleInputChange} className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" type="email" placeholder="Email Address" required />
                  

                  <select
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.target.value)}
                    className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
                  >
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Add-ons</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {addOns.map((item) => (
                        <label key={item.label} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                          <span>{item.label}</span>
                          <span className="flex items-center gap-2">
                            <span className="font-semibold">+${item.price}</span>
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(item.label)}
                              onChange={() => toggleAddOn(item.label)}
                            />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="date" value={bookingForm.date} onChange={handleInputChange} className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" type="date" required />
                    <input name="time" value={bookingForm.time} onChange={handleInputChange} className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" type="time" required />
                  </div>

                  <textarea name="notes" value={bookingForm.notes} onChange={handleInputChange} className="min-h-[120px] rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" placeholder="Vehicle details or special requests" />

                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Estimated total: <span className="font-bold text-slate-900">${totalEstimate}</span>
                  </div>

                  <button className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
                    Request Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Reviews</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">What customers are saying.</h3>
            </div>
            <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 md:block">Rated 4.9/5 by local drivers</div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
                <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">FAQ</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">Common questions from customers.</h3>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {faq.map((item) => (
                <div key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">{item.question}</h4>
                  <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-900 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Contact Us</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">Let’s keep your car looking its best.</h3>
              <p className="mt-4 max-w-lg text-slate-300">
                Reach out for questions, custom detailing, fleet bookings, or business partnerships.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Hand wash safe</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Interior detailing</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Fleet bookings</span>
              </div>
              <p><span className="font-semibold text-white">Phone:</span> 236-982-2823</p>
              <p><span className="font-semibold text-white">Email:</span> amazingevan0610@gmail.com</p>
              <p><span className="font-semibold text-white">Location:</span> Surrey, BC</p>
              <p><span className="font-semibold text-white">Hours:</span> Mon–Sun, 8:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-5 right-5 z-50">
        {chatOpen && (
          <div className="mb-3 w-[320px] rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="rounded-t-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              Luc&Evan AI Assistant
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    message.role === "assistant"
                      ? "bg-slate-100 text-slate-800"
                      : "ml-auto bg-sky-600 text-white"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-200 p-3">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleChatSend();
                }}
                className="flex-1 rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-600"
                placeholder="Ask about price, hours, booking..."
              />
              <button
                onClick={handleChatSend}
                className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Send
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen((value) => !value)}
          className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-sky-700"
        >
          {chatOpen ? "Close Chat" : "AI Help"}
        </button>
      </div>
    </div>
  );
}
