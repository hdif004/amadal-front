import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { asset } from '../config';

const HeroHeader = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative mt-16 w-full bg-cover bg-center rounded-b-3xl overflow-hidden
                 min-h-[40vh] lg:min-h-[520px] lg:max-h-[650px]"
      style={{ backgroundImage: `url(${asset("HeroHeader.png")})` }}
    >
      {/* Overlay gradient : sombre à gauche, s'éclaircit à droite */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

      {/* Contenu */}
      <div className="relative h-full min-h-[inherit] flex flex-col justify-center
                      items-center lg:items-start text-center lg:text-left
                      px-6 sm:px-10 lg:pl-20 xl:pl-32 py-8 lg:py-0">

        <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[50%] xl:max-w-[44%]">

          {/* Titre */}
          <div className="flex flex-col gap-1">
            <h1 className="text-white font-extrabold text-[1.6rem] xs:text-[1.85rem] sm:text-5xl lg:text-5xl xl:text-[3.4rem]
                           leading-[1.08] tracking-tight whitespace-nowrap">
              {t('hero.title')}
            </h1>
            <span className="text-primary font-extrabold text-[1.6rem] xs:text-[1.85rem] sm:text-5xl lg:text-5xl xl:text-[3.4rem]
                             leading-[1.08] tracking-tight whitespace-nowrap">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Description */}
          <p className="text-white/70 text-base sm:text-[17px] leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col gap-3 mt-1 w-full lg:w-auto lg:flex-row">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-4
                         border-2 border-white text-white font-semibold text-base rounded-xl
                         hover:bg-white hover:text-primary transition-all duration-200"
            >
              {t('hero.contactUs')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>

            <a
              href="http://wa.me/212600008321"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4
                         bg-white text-primary font-semibold text-base rounded-xl
                         hover:bg-primary hover:text-white transition-all duration-200"
            >
              {t('hero.whatsapp')}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </a>
          </div>

        </div>


      </div>
    </div>
  );
};

export default HeroHeader;
