import { useTranslation } from "react-i18next";
import GoogleMap from "../components/GoogleMap";

const ContactItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <p className="text-xs font-bold uppercase tracking-widest text-primary/60">{label}</p>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  </div>
);

const ContactMap = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f7faf9]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">

        {/* En-tête */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
              {t("contact.callUs")}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {t("contact.letWorkTogether")}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Infos contact */}
          <div className="flex flex-col gap-6 lg:w-[380px] xl:w-[420px] flex-shrink-0">

            {/* Cards infos */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 border border-gray-100 shadow-sm">
              <ContactItem
                label="Adresse"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                }
              >
                121, rue Radi Slaoui, Belvédère<br />Casablanca, Maroc
              </ContactItem>

              <div className="w-full h-px bg-gray-100" />

              <ContactItem
                label="Email"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                }
              >
                <a href="mailto:amadal.distribution@gmail.com"
                  className="text-primary hover:underline break-all">
                  amadal.distribution@gmail.com
                </a>
              </ContactItem>

              <div className="w-full h-px bg-gray-100" />

              <ContactItem
                label="Téléphone"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                  </svg>
                }
              >
                <div className="flex flex-col gap-1">
                  {["+212522404987", "+212600008321", "+212600008318", "+212600307777"].map((n) => (
                    <a key={n} href={`tel:${n}`}
                      className="hover:text-primary transition-colors">
                      {n.replace(/(\+212)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}
                    </a>
                  ))}
                </div>
              </ContactItem>
            </div>

            {/* Bouton CTA */}
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&to=amadal.distribution@gmail.com&su&body&tf=cm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4
                         bg-primary text-white font-semibold text-sm rounded-xl
                         hover:bg-primary/90 transition-colors duration-200"
            >
              {t("contact.emailUs")}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Map */}
          <div className="flex-1 min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <GoogleMap />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMap;
