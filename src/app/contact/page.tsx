import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let's Connect
          </h1>

          <p className="max-w-3xl mx-auto text-white/70 text-lg">
            Whether you're looking for cybersecurity training, consulting,
            partnerships, or internship opportunities, we'd love to hear from
            you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="text-sky-400" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href="tel:7982114429"
                    className="text-white/70 hover:text-sky-400"
                  >
                    +91 7982114429
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-sky-400" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href="mailto:info@abreonix.in"
                    className="text-white/70 hover:text-sky-400"
                  >
                    info@abreonix.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MessageCircle className="text-sky-400" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a
                    href="https://wa.me/917982114429"
                    target="_blank"
                    className="text-white/70 hover:text-sky-400"
                  >
                    Chat With Us
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-sky-400" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-white/70 leading-relaxed">
                    288/16/84, New Basti,
                    <br />
                    Block-C, Sohbatia Bagh,
                    <br />
                    Allahpur, Prayagraj,
                    <br />
                    Uttar Pradesh - 211006
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">
              Send a Message
            </h2>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 outline-none focus:border-sky-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 outline-none focus:border-sky-400"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 outline-none focus:border-sky-400"
              />

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-400 py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}