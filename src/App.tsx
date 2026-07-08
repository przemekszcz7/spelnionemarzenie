/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for fade-in animations on scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".fade-in-on-scroll");

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Falls back to direct visibility if IntersectionObserver is not available
      animatedElements.forEach((el) => {
        el.classList.remove("opacity-0");
        el.classList.add("animate-fade-in-up");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    animatedElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-warm-cream font-sans text-dark-choco selection:bg-accent-gold selection:text-dark-choco">
      
      {/* 2. NAWIGACJA — <header> / <nav> */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-dark-choco py-3 shadow-[0_2px_20px_rgba(0,0,0,0.3)] border-b border-accent-gold/10" : "bg-transparent py-5"}`}>
        <div className="max-w-[1140px] mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo / nazwa po lewej */}
          <a href="#" className="flex flex-col group transition-transform duration-300 hover:scale-102" id="nav-logo">
            <span className="font-cursive text-2xl md:text-[26px] text-accent-gold leading-none font-semibold">
              Spełnione Marzenie
            </span>
            <span className="font-mono text-[9px] md:text-[11px] tracking-[4px] uppercase text-white mt-1 leading-none opacity-85 group-hover:opacity-100 transition-opacity">
              NALEŚNIKARNIA
            </span>
          </a>

          {/* Linki po prawej (Desktop) */}
          <div className="hidden md:flex items-center space-x-10" id="desktop-links">
            <a href="#o-nas" className="font-sans text-[13px] font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors duration-300">
              O nas
            </a>
            <a href="#menu" className="font-sans text-[13px] font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors duration-300">
              Co serwujemy
            </a>
            <a href="#kontakt" className="font-sans text-[13px] font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors duration-300">
              Kontakt
            </a>
          </div>

          {/* Przycisk Hamburger (Mobile) */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-accent-terracotta/20 hover:bg-accent-terracotta/40 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-accent-gold transition-all duration-300 transform rotate-0 hover:rotate-90" />
            ) : (
              <Menu className="w-5 h-5 text-accent-gold transition-all duration-300" />
            )}
          </button>

        </div>

        {/* Menu mobilne rozwijane pionowo */}
        <div 
          id="mobile-dropdown"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-dark-choco border-b border-accent-gold/20`}
          style={{ maxHeight: isMobileMenuOpen ? "400px" : "0px" }}
        >
          <div className="px-6 py-6 flex flex-col space-y-4 items-center">
            <a 
              href="#o-nas" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors"
            >
              O nas
            </a>
            <a 
              href="#menu" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors"
            >
              Co serwujemy
            </a>
            <a 
              href="#kontakt" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors"
            >
              Kontakt
            </a>
          </div>
        </div>
      </nav>

      {/* 3. HERO — sekcja powitalna */}
      <header 
        id="hero"
        className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(35,43,36,0.6) 0%, rgba(35,43,36,0.8) 60%, rgba(35,43,36,0.96) 100%), url('https://i.ibb.co/ZRWcq6QD/649102734-26219964550948472-204026828541114034-n.jpg')`
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center pt-20">
          
          {/* Dekoracyjna etykieta */}
          <p 
            id="hero-label"
            className="font-cursive text-xl md:text-2xl text-accent-gold mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            ✦ w sercu Kamienia Śląskiego ✦
          </p>

          {/* Główny tytuł */}
          <h1 
            id="hero-title"
            className="font-serif leading-none text-center select-none flex flex-col items-center animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-[54px] md:text-[98px] text-[#FFF8EE] font-normal italic leading-tight">
              Spełnione
            </span>
            <span className="text-[58px] md:text-[94px] text-accent-gold font-bold tracking-[6px] uppercase leading-none mt-1">
              MARZENIE
            </span>
          </h1>

          {/* Cienka dekoracyjna linia */}
          <div 
            id="hero-divider"
            className="w-20 h-[3px] bg-accent-terracotta my-7 rounded-full animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          ></div>

          {/* Podtytuł */}
          <p 
            id="hero-sub"
            className="font-sans text-lg md:text-2xl text-accent-wheat font-light tracking-[1px] max-w-2xl px-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Pyszne naleśniki francuskie na słodko i wytrawnie
          </p>

          {/* Opis */}
          <p 
            id="hero-desc"
            className="font-mono text-xs md:text-sm text-accent-wheat/70 tracking-[4px] mt-3 uppercase animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Kawa · Lody · Zimne napoje
          </p>

          {/* Dwa przyciski */}
          <div 
            id="hero-buttons"
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 w-full sm:w-auto px-6 sm:px-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a 
              href="tel:539889626" 
              className="inline-block bg-accent-terracotta text-white font-sans text-[13px] font-bold uppercase tracking-[2px] px-9 py-[15px] rounded-full shadow-lg hover:bg-accent-gold hover:text-dark-choco hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Zadzwoń i zarezerwuj
            </a>
            <a 
              href="#menu" 
              className="inline-block border-2 border-accent-wheat text-accent-wheat hover:bg-accent-wheat/15 font-sans text-[13px] font-bold uppercase tracking-[2px] px-9 py-[13px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Co serwujemy
            </a>
          </div>

        </div>

        {/* Strzałka scroll w dół */}
        <a 
          id="hero-arrow"
          href="#promo-banner" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent-gold text-3xl select-none hover:text-[#FFF8EE] transition-colors"
          aria-label="Scroll down"
        >
          <div className="animate-bounce text-accent-gold">
            ↓
          </div>
        </a>
      </header>

      {/* 4. PASEK PROMOCYJNY — między hero a ofertą */}
      <section 
        id="promo-banner" 
        className="bg-accent-terracotta py-5 px-6 shadow-md relative z-10 text-center"
      >
        <div className="max-w-[1140px] mx-auto">
          <p className="font-cursive text-xl md:text-[23px] text-[#FFF8EE] leading-relaxed">
            „Wpadajcie na pyszne naleśniki, aromatyczną kawę, lody i coś zimnego do picia 🥞☕🍦”
          </p>
        </div>
      </section>

      {/* 5. SEKCJA „O NAS" — id="o-nas" */}
      <section 
        id="o-nas" 
        className="py-24 bg-warm-cream relative overflow-hidden"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Lewa kolumna — treść */}
            <div className="lg:col-span-7 fade-in-on-scroll opacity-0 flex flex-col" id="about-text-content">
              <span className="font-cursive text-[22px] text-accent-terracotta mb-2">
                o nas
              </span>
              <h2 className="font-serif text-3xl md:text-[44px] text-dark-choco font-bold leading-tight">
                Z miłości do naleśników
              </h2>
              <div className="w-[60px] h-1 bg-accent-terracotta my-5 rounded-full"></div>
              
              <div className="space-y-6 text-[15px] md:text-[17px] text-text-sub font-light leading-relaxed">
                <p>
                  Naleśnikarnia <strong>Spełnione Marzenie</strong> to wyjątkowe miejsce w samym sercu Kamienia Śląskiego, gdzie każdy naleśnik przygotowywany jest z prawdziwą pasją i najlepszych, dokładnie wyselekcjonowanych składników.
                </p>
                <p>
                  Nasze cienkie naleśniki w stylu francuskim możesz zamówić na słodko lub wytrawnie — dobieramy nadzienie tak, by dogodzić każdemu podniebieniu. Każdej potrawie towarzyszy u nas aromatyczna, świeżo parzona kawa, pyszne lody i chłodne, orzeźwiające napoje w sam raz na miły odpoczynek.
                </p>
              </div>

              {/* Trzy małe ikony-fakty */}
              <div className="flex flex-row flex-wrap gap-8 md:gap-10 mt-10" id="about-facts">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[34px] mb-2 filter drop-shadow">🥞</span>
                  <span className="font-sans text-xs uppercase tracking-[2px] text-accent-terracotta font-bold">Naleśniki</span>
                  <span className="font-sans text-[11px] text-text-sub uppercase mt-1 tracking-wider">Słodkie i wytrawne</span>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[34px] mb-2 filter drop-shadow">☕</span>
                  <span className="font-sans text-xs uppercase tracking-[2px] text-accent-terracotta font-bold">Kawa</span>
                  <span className="font-sans text-[11px] text-text-sub uppercase mt-1 tracking-wider">Aromatyczne espresso</span>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[34px] mb-2 filter drop-shadow">🍦</span>
                  <span className="font-sans text-xs uppercase tracking-[2px] text-accent-terracotta font-bold">Lody</span>
                  <span className="font-sans text-[11px] text-text-sub uppercase mt-1 tracking-wider">Słodkie chwile</span>
                </div>
              </div>
            </div>

            {/* Prawa kolumna — dekoracja wizualna ze zdjęciem */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-10" id="about-visual-deco">
              
              <div className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border-[6px] border-accent-gold bg-warm-apricot shadow-[0_15px_40px_rgba(35,43,36,0.06)] flex items-center justify-center transition-transform duration-500 hover:scale-105 active:rotate-3">
                
                {/* Wewnętrzny kontener na prawdziwe zdjęcie naleśnikarni */}
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://i.ibb.co/fVJkczL7/729629195-1206043191619447-4875807037102351220-n.jpg" 
                    alt="Wnętrze kawiarni Naleśnikarnia Spełnione Marzenie" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Nałożony drugi mniejszy okrąg (monogram kawiarni) */}
                <div className="absolute -top-4 -right-4 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full bg-[#FAF8F4]/90 border border-accent-gold/40 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center shadow-md">
                  <span className="font-cursive text-xl md:text-2xl text-accent-brown leading-none font-bold">Cafe</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-main mt-1">Bistro</span>
                </div>

                {/* Dodatkowe kółko z boku dla asymetrii */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[#FAF8F4]/90 border border-accent-gold/30 backdrop-blur-sm flex items-center justify-center shadow-md">
                  <span className="text-2xl select-none">🥞</span>
                </div>

                {/* Subtelny napis wokół okręgu */}
                <span className="absolute bottom-6 font-mono text-[9px] uppercase tracking-[4px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
                  SMACZNIE Z SERCEM
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. SEKCJA „CO SERWUJEMY" — id="menu" */}
      <section 
        id="menu" 
        className="py-24 bg-warm-apricot relative border-y border-accent-terracotta/10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="menu-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — co podajemy —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold">
              Co serwujemy
            </h2>
            <p className="font-sans text-base md:text-lg text-text-sub mt-4 font-light leading-relaxed">
              Każdy kęs to mała uczta. Poznaj nasze stałe i wyjątkowe propozycje przygotowywane każdego dnia z sercem.
            </p>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Trzy kolumny propozycji */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="menu-grid">
            
            {/* Kolumna 1 — Na Słodko 🍓 */}
            <div className="bg-warm-cream/50 p-6 md:p-8 rounded-2xl shadow-sm border border-accent-terracotta/5 fade-in-on-scroll opacity-0 flex flex-col justify-between" id="menu-sweet">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b-2 border-accent-terracotta/15 pb-4">
                  <span className="text-3xl select-none">🍓</span>
                  <h3 className="font-serif text-xl md:text-2xl text-accent-terracotta font-bold italic leading-none">
                    Na Słodko
                  </h3>
                </div>

                <div className="text-[14px] md:text-[15px] text-text-sub font-light leading-relaxed space-y-3">
                  <p>
                    Rozpływające się w ustach, złociste naleśniki przygotowywane na bazie tradycyjnego, lekkiego ciasta. To idealny wybór dla miłośników słodkich francuskich crepe'ów i domowych, owocowych aromatów.
                  </p>
                  <p>
                    Serwujemy je wyłącznie w wersji słodkiej ze wspaniałymi dodatkami ze spiżarni, owocami, kremami i puszystą bitą śmietaną.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-accent-terracotta/15 text-center">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta bg-accent-gold/15 px-3 py-1.5 rounded-full inline-block">
                  Słodkie naleśniki
                </span>
              </div>
            </div>

            {/* Kolumna 2 — Na Wytrawnie 🧀 */}
            <div className="bg-warm-cream/50 p-6 md:p-8 rounded-2xl shadow-sm border border-accent-terracotta/5 fade-in-on-scroll opacity-0 flex flex-col justify-between" id="menu-savory">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b-2 border-accent-terracotta/15 pb-4">
                  <span className="text-3xl select-none">🧀</span>
                  <h3 className="font-serif text-xl md:text-2xl text-accent-terracotta font-bold italic leading-none">
                    Na Wytrawnie
                  </h3>
                </div>

                <div className="text-[14px] md:text-[15px] text-text-sub font-light leading-relaxed space-y-3">
                  <p>
                    Dla tych, którzy szukają czegoś bardziej sycącego, przygotowaliśmy pyszne naleśniki w odsłonie słonej ze smakowitym, gorącym i ciągnącym się wnętrzem.
                  </p>
                  <p>
                    Wspaniała i pożywna propozycja na udany obiad, ciepły lunch lub kolację z idealnie skomponowanymi, tradycyjnymi i świeżymi składnikami.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-accent-terracotta/15 text-center">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta bg-accent-gold/15 px-3 py-1.5 rounded-full inline-block">
                  Naleśniki wytrawne
                </span>
              </div>
            </div>

            {/* Kolumna 3 — Leberkäse 🍖 */}
            <div className="bg-warm-cream/50 p-6 md:p-8 rounded-2xl shadow-sm border border-accent-terracotta/5 fade-in-on-scroll opacity-0 flex flex-col justify-between" id="menu-leberkase">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b-2 border-accent-terracotta/15 pb-4">
                  <span className="text-3xl select-none">🍖</span>
                  <h3 className="font-serif text-xl md:text-2xl text-accent-terracotta font-bold italic leading-none">
                    Leberkäse
                  </h3>
                </div>

                <div className="text-[14px] md:text-[15px] text-text-sub font-light leading-relaxed space-y-3">
                  <p>
                    Wyjątkowa i niezwykle lubiana, tradycyjna specjalność – aromatyczny, pieczony klops mięsny (Leberkäse), podawany w naszej kawiarni na gorąco.
                  </p>
                  <p>
                    Zachwyca chrupiącą skórką, idealnie miękkim, soczystym wnętrzem oraz tradycyjnym, głębokim smakiem, który wspaniale pasuje na pożywny posiłek o każdej porze dnia.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-accent-terracotta/15 text-center">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-terracotta bg-accent-gold/15 px-3 py-1.5 rounded-full inline-block">
                  Tradycyjny przysmak
                </span>
              </div>
            </div>

          </div>

          {/* Pod tabelą — sekcja napojów */}
          <div className="mt-16 pt-10 border-t border-accent-terracotta/10 text-center max-w-2xl mx-auto fade-in-on-scroll opacity-0" id="drinks-section">
            <h4 className="font-cursive text-2xl md:text-[30px] text-accent-terracotta mb-8">
              A do tego...
            </h4>
            
            <div className="flex flex-row justify-center gap-6 sm:gap-10 flex-wrap">
              <div className="flex flex-col items-center bg-warm-cream/40 px-5 py-4 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[100px]">
                <span className="text-[38px] mb-2 filter drop-shadow">☕</span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Kawa</span>
              </div>
              <div className="flex flex-col items-center bg-warm-cream/40 px-5 py-4 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[100px]">
                <span className="text-[38px] mb-2 filter drop-shadow">🍦</span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Lody</span>
              </div>
              <div className="flex flex-col items-center bg-warm-cream/40 px-5 py-4 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[110px]">
                <span className="text-[38px] mb-2 filter drop-shadow">🥤</span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Napoje</span>
              </div>
              <div className="flex flex-col items-center bg-warm-cream/40 px-5 py-4 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[100px]">
                <span className="text-[38px] mb-2 filter drop-shadow">🧃</span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Soki</span>
              </div>
            </div>

            {/* Nota pod menu */}
            <p className="font-mono text-xs text-text-sub/70 italic mt-12 block">
              Menu może ulec zmianie. Pytaj o aktualne propozycje dnia!
            </p>
          </div>

        </div>
      </section>

      {/* 7. SEKCJA WYRÓŻNIENIA — „DLACZEGO MY" */}
      <section 
        id="dlaczego-my" 
        className="py-24 bg-dark-choco text-white relative z-10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek wycentrowany */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="why-us-header">
            <h2 className="font-serif text-3xl md:text-[40px] text-[#FFF8EE] font-normal italic leading-tight">
              Małe miejsce, wielkie smaki
            </h2>
            <div className="w-[60px] h-[2px] bg-accent-gold mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Siatka 3 kart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="why-us-grid">
            
            {/* Karta 1 */}
            <div className="bg-white/[0.03] border border-accent-gold/25 rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/[0.08] hover:-translate-y-1" id="card-1">
              <span className="text-5xl block mb-6 filter drop-shadow-md select-none">
                🥞
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-accent-gold font-bold mb-4">
                Naleśniki Francuskie
              </h3>
              <p className="font-sans text-[14px] text-[#FFF8EE]/75 leading-[1.7] font-light">
                Cienkie, złociste, przygotowywane wyłącznie na świeżo i według sprawdzonej, domowej receptury.
              </p>
            </div>

            {/* Karta 2 */}
            <div className="bg-white/[0.03] border border-accent-gold/25 rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/[0.08] hover:-translate-y-1" id="card-2">
              <span className="text-5xl block mb-6 filter drop-shadow-md select-none">
                ☕
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-accent-gold font-bold mb-4">
                Aromatyczna Kawa
              </h3>
              <p className="font-sans text-[14px] text-[#FFF8EE]/75 leading-[1.7] font-light">
                Do każdego spotkania podajemy kawę, która wita Cię ciepłem i pobudzającym zapiekiem z ekspresu.
              </p>
            </div>

            {/* Karta 3 */}
            <div className="bg-white/[0.03] border border-accent-gold/25 rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/[0.08] hover:-translate-y-1" id="card-3">
              <span className="text-5xl block mb-6 filter drop-shadow-md select-none">
                📍
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-accent-gold font-bold mb-4">
                Serce Kamienia Śląskiego
              </h3>
              <p className="font-sans text-[14px] text-[#FFF8EE]/75 leading-[1.7] font-light">
                Znajdziesz nas przy ul. Ligonia 2 — tuż w samym urokliwym centrum, w idealnym miejscu, aby się zatrzymać.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. SEKCJA KONTAKT — id="kontakt" */}
      <section 
        id="kontakt" 
        className="py-24 bg-warm-cream relative"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="contact-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — znajdź nas —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold">
              Kontakt i Dojazd
            </h2>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Dwie kolumny - dane kontaktowe / mapa */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="contact-grid">
            
            {/* Lewa kolumna — dane kontaktowe */}
            <div className="lg:col-span-5 space-y-2 divider-y fade-in-on-scroll opacity-0" id="contact-details">
              
              {/* Blok 1 - Adres */}
              <div className="contact-block py-6 border-b border-accent-terracotta/15 flex items-start gap-4">
                <span className="text-[28px] text-accent-terracotta flex-shrink-0 mt-1 select-none">
                  📍
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-text-sub block leading-none">
                    Adres
                  </span>
                  <p className="font-sans text-[17px] md:text-18px text-dark-choco font-semibold mt-2">
                    ul. Ligonia 2, Kamień Śląski 47-325
                  </p>
                </div>
              </div>

              {/* Blok 2 - Telefon */}
              <div className="contact-block py-6 border-b border-accent-terracotta/15 flex items-start gap-4">
                <span className="text-[28px] text-accent-terracotta flex-shrink-0 mt-1 select-none">
                  📞
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-text-sub block leading-none">
                    Telefon
                  </span>
                  <p className="font-sans text-[20px] md:text-22px text-dark-choco font-bold mt-2">
                    <a href="tel:539889626" className="hover:text-accent-terracotta transition-colors duration-300">
                      539 889 626
                    </a>
                  </p>
                </div>
              </div>

              {/* Blok 3 - E-mail */}
              <div className="contact-block py-6 border-b border-accent-terracotta/15 flex items-start gap-4">
                <span className="text-[28px] text-accent-terracotta flex-shrink-0 mt-1 select-none">
                  ✉️
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-text-sub block leading-none">
                    E-mail
                  </span>
                  <p className="font-sans text-[16px] md:text-[18px] text-dark-choco font-semibold mt-2 break-all">
                    <a href="mailto:nalesnikarniakamien@gmail.com" className="hover:text-accent-terracotta transition-colors duration-300 underline underline-offset-4 decoration-accent-terracotta/30">
                      nalesnikarniakamien@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Blok 4 - Facebook */}
              <div className="contact-block py-6 flex items-start gap-4">
                <span className="text-[28px] text-accent-terracotta flex-shrink-0 mt-1 select-none">
                  📘
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-text-sub block leading-none">
                    Facebook
                  </span>
                  <div className="mt-3">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61581779428803" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#156bec] text-white font-sans text-[13px] font-bold uppercase tracking-[1px] px-6 py-3 rounded-full hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span>Odwiedź nasz profil</span>
                      <span className="text-sm font-normal">→</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Prawa kolumna — mapa Google */}
            <div className="lg:col-span-7 fade-in-on-scroll opacity-0" id="contact-map-col">
              <div className="relative pb-[65%] h-0 overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(35,43,36,0.12)] border-[3px] border-accent-terracotta/30 group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.3857500330084!2d18.0694125!3d50.7127944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711ad8fc0ebd9ab%3A0x868bbaa25eceb85b!2sul.%20Ligonia%202%2C%2047-325%20Kamie%C5%84%20Szl%C4%85ski!5e0!3m2!1spl!2spl!4v1719119200000!5m2!1spl!2spl"
                  className="absolute top-0 left-0 w-full h-full border-b duration-500 scale-100 group-hover:scale-[1.01]" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Mapa Lokalizacyjna Naleśnikarni"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FOOTER */}
      <footer 
        id="footer" 
        className="bg-dark-choco text-white pt-12 pb-8 px-6 border-t border-accent-gold/20"
      >
        <div className="max-w-[1140px] mx-auto flex flex-col items-center gap-8 text-center">
          
          {/* Nazwa */}
          <div className="flex flex-col items-center" id="footer-brand">
            <span className="font-cursive text-[32px] text-accent-gold font-bold leading-none">
              Spełnione Marzenie
            </span>
            <span className="font-mono text-[10px] tracking-[5px] uppercase text-[#FFF8EE]/45 mt-2">
              NALEŚNIKARNIA
            </span>
          </div>

          {/* Dane skrócone */}
          <div className="text-sm text-[#FFF8EE]/60 tracking-wider max-w-xl mx-auto leading-relaxed" id="footer-details">
            ul. Ligonia 2, Kamień Śląski &middot; Tel: 539 889 626 &middot; nalesnikarniakamien@gmail.com
          </div>

          {/* Linia dolna */}
          <div className="w-full border-t border-accent-gold/10 pt-6 mt-2 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#FFF8EE]/30" id="footer-bottom">
            <span>
              &copy; 2026 Naleśnikarnia Spełnione Marzenie &ndash; Bronisława Sleziona. Wszelkie prawa zastrzeżone.
            </span>
            <span className="font-mono text-[10px]">
              Kamień Śląski &middot; Bistro Cafe
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
