/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Info, 
  Coffee, 
  IceCream, 
  GlassWater, 
  Beer, 
  Wine, 
  PartyPopper, 
  Cake, 
  Pizza, 
  Leaf,
  Utensils,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Search,
  Users,
  Briefcase,
  Star,
  User,
  ZoomIn,
  Type
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  SWEET_PANCAKES, 
  SAVORY_PANCAKES, 
  NOVELTIES, 
  HOT_DRINKS, 
  COLD_DRINKS, 
  BEERS, 
  DRINKS_AND_SHOTS, 
  GALLERY_IMAGES 
} from "./data";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("sweet");
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(12);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
  const [isLargeTextMode, setIsLargeTextMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Menu horizontal scrolling controls
  const menuTabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (menuTabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuTabsRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  const handleMenuTabsScroll = (direction: "left" | "right") => {
    if (menuTabsRef.current) {
      const scrollAmount = 240;
      menuTabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const el = menuTabsRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeMenuTab]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxImageIndex(null);
    setIsZoomed(false);
  };

  const showPrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxImageIndex !== null) {
      setLightboxImageIndex((prevIndex) => 
        prevIndex === 0 ? GALLERY_IMAGES.length - 1 : prevIndex! - 1
      );
      setIsZoomed(false);
    }
  };

  const showNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxImageIndex !== null) {
      setLightboxImageIndex((prevIndex) => 
        prevIndex === GALLERY_IMAGES.length - 1 ? 0 : prevIndex! + 1
      );
      setIsZoomed(false);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "ArrowRight") showNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImageIndex]);

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
              Menu
            </a>
            <a href="#imprezy" className="font-sans text-[13px] font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors duration-300">
              Imprezy
            </a>
            <a href="#galeria" className="font-sans text-[13px] font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors duration-300">
              Galeria
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
              Menu
            </a>
            <a 
              href="#imprezy" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors"
            >
              Imprezy
            </a>
            <a 
              href="#galeria" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-bold uppercase tracking-[2px] text-[#FFF8EE] hover:text-accent-gold transition-colors"
            >
              Galeria
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
          backgroundImage: `linear-gradient(to bottom, rgba(35,43,36,0.3) 0%, rgba(35,43,36,0.45) 60%, rgba(35,43,36,0.7) 100%), url('https://i.ibb.co/mrTSTj82/color-edited-image-1.jpg')`
        }}
      >
        {/* Transparentny naleśnik (crepe cutout) - umieszczony z boku headera */}
        <div 
          className="absolute -right-12 sm:right-[5%] md:right-[8%] lg:right-[12%] top-[12%] sm:top-[20%] md:top-[25%] w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-fade-in-up select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.75)] z-10 opacity-80 sm:opacity-95"
          style={{ animationDelay: "0.05s" }}
        >
          <img 
            src="https://i.ibb.co/VrX0jyK/567717619-122104393821059314-2705947514695363768-n-Photoroom.png" 
            alt="Naleśnik" 
            className="w-full h-full object-contain animate-float rotate-12"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center pt-24 pb-28 sm:pb-16 relative z-20">
          
          {/* Dekoracyjna etykieta */}
          <p 
            id="hero-label"
            className="font-cursive text-xl md:text-2xl text-accent-gold mb-4 animate-fade-in-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "0.1s" }}
          >
            ✦ w sercu Kamienia Śląskiego ✦
          </p>

          {/* Główny tytuł */}
          <h1 
            id="hero-title"
            className="font-serif leading-none text-center select-none flex flex-col items-center animate-fade-in-up drop-shadow-[0_3px_6px_rgba(0,0,0,0.75)]"
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
            className="w-20 h-[3px] bg-accent-terracotta my-5 sm:my-7 rounded-full animate-fade-in-up shadow-sm"
            style={{ animationDelay: "0.3s" }}
          ></div>

          {/* Podtytuł */}
          <p 
            id="hero-sub"
            className="font-sans text-lg md:text-2xl text-accent-wheat font-light tracking-[1px] max-w-2xl px-4 animate-fade-in-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
            style={{ animationDelay: "0.4s" }}
          >
            Pyszne naleśniki francuskie na słodko i wytrawnie
          </p>

          {/* Opis */}
          <p 
            id="hero-desc"
            className="font-mono text-xs md:text-sm text-accent-wheat/80 tracking-[4px] mt-3 uppercase animate-fade-in-up drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]"
            style={{ animationDelay: "0.5s" }}
          >
            Kawa · Lody · Zimne napoje
          </p>

          {/* Dwa przyciski */}
          <div 
            id="hero-buttons"
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10 w-full sm:w-auto px-6 sm:px-0 animate-fade-in-up"
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
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-accent-gold select-none hover:text-[#FFF8EE] transition-colors"
          aria-label="Scroll down"
        >
          <div className="animate-bounce text-accent-gold p-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
            <ChevronDown className="w-6 h-6" />
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
            „Wpadajcie na pyszne naleśniki, aromatyczną kawę, lody i coś zimnego do picia”
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
                  Są marzenia, które czekają na swój moment. Moje dojrzewało przez wiele lat. Dziś stało się rzeczywistością.
                </p>
                <p>
                  <strong>Spełnione Marzenie</strong> to miejsce stworzone z serca – z myślą o ludziach, którzy chcą na chwilę zwolnić, dobrze zjeść i spędzić czas w wyjątkowej atmosferze.
                </p>
              </div>

              {/* Trzy małe ikony-fakty */}
              <div className="flex flex-row flex-wrap gap-8 md:gap-10 mt-10" id="about-facts">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <Utensils className="w-8 h-8 text-accent-terracotta mb-2.5" />
                  <span className="font-sans text-xs uppercase tracking-[2px] text-accent-terracotta font-bold">Naleśniki</span>
                  <span className="font-sans text-[11px] text-text-sub uppercase mt-1 tracking-wider">Słodkie i wytrawne</span>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <Coffee className="w-8 h-8 text-accent-terracotta mb-2.5" />
                  <span className="font-sans text-xs uppercase tracking-[2px] text-accent-terracotta font-bold">Kawa</span>
                  <span className="font-sans text-[11px] text-text-sub uppercase mt-1 tracking-wider">Aromatyczne espresso</span>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <IceCream className="w-8 h-8 text-accent-terracotta mb-2.5" />
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
                  <Utensils className="w-6 h-6 text-accent-terracotta" />
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

      {/* 6. SEKCJA „MENU" — id="menu" */}
      <section 
        id="menu" 
        className="py-24 bg-warm-apricot relative border-y border-accent-terracotta/10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="menu-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — menu kawiarni —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold">
              Nasze Menu
            </h2>
            <p className="font-sans text-base md:text-lg text-text-sub mt-4 font-light leading-relaxed">
              Poznaj nasze stałe i wyjątkowe propozycje przygotowywane każdego dnia z sercem i pasją.
            </p>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Opcje dostępności / powiększenia */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/40 backdrop-blur-sm px-6 py-4 rounded-2xl border border-accent-gold/20 max-w-xl mx-auto text-center sm:text-left shadow-sm" id="menu-accessibility-bar">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-accent-terracotta/10 rounded-lg text-accent-terracotta shrink-0">
                <ZoomIn className="w-4 h-4" />
              </span>
              <p className="font-sans text-xs md:text-sm text-accent-brown font-medium">
                💡 Kliknij dowolną pozycję, aby ją powiększyć!
              </p>
            </div>
            <button
              onClick={() => setIsLargeTextMode(!isLargeTextMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                isLargeTextMode
                  ? "bg-accent-terracotta text-white shadow-sm scale-105"
                  : "bg-[#FAF8F4]/80 border border-accent-gold/30 text-accent-brown hover:bg-accent-gold/15 hover:border-accent-terracotta/40"
              }`}
            >
              <Type className="w-4 h-4" />
              <span>{isLargeTextMode ? "Zwykły tekst" : "Duży tekst"}</span>
            </button>
          </div>

          {/* Kategorie menu w postaci eleganckich zakładek z przyciskami przewijania */}
          <div className="relative w-full mb-12 group/tabs" id="menu-tabs-container">
            {/* Przycisk lewo */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleMenuTabsScroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-accent-gold/40 text-accent-terracotta shadow-md flex items-center justify-center hover:bg-accent-terracotta hover:text-white hover:border-accent-terracotta transition-all cursor-pointer"
                  aria-label="Przewiń menu w lewo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div 
              ref={menuTabsRef}
              className="w-full overflow-x-auto no-scrollbar pb-2" 
              id="menu-tabs"
            >
              <div className="flex justify-start md:justify-center gap-3 min-w-max px-12 md:px-8 py-2">
                {[
                  { id: "sweet", label: "Naleśniki Słodkie", icon: Cake },
                  { id: "savory", label: "Naleśniki Wytrawne", icon: Utensils },
                  { id: "novelties", label: "Nowości", icon: Sparkles },
                  { id: "hot", label: "Napoje Gorące", icon: Coffee },
                  { id: "drinks", label: "Napoje, Piwa & Drinki", icon: Wine }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMenuTab(tab.id)}
                      className={`px-5 py-3 rounded-full text-[13px] md:text-[14px] font-sans font-bold uppercase tracking-[1px] transition-all duration-300 flex items-center gap-2 select-none shrink-0 cursor-pointer ${
                        activeMenuTab === tab.id
                          ? "bg-accent-terracotta text-white shadow-md scale-105 border border-accent-terracotta"
                          : "bg-white/50 text-text-sub hover:bg-white/85 hover:text-dark-choco border border-accent-terracotta/10"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Przycisk prawo */}
            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleMenuTabsScroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-accent-gold/40 text-accent-terracotta shadow-md flex items-center justify-center hover:bg-accent-terracotta hover:text-white hover:border-accent-terracotta transition-all cursor-pointer"
                  aria-label="Przewiń menu w prawo"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamiczne renderowanie zawartości zakładki */}
          <div className="min-h-[300px]" id="menu-tabs-content">
            {activeMenuTab === "sweet" && (
              <div className="animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {SWEET_PANCAKES.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedMenuItem({ ...item, category: "Naleśnik Słodki" })}
                      className={`flex items-baseline justify-between border-b border-accent-terracotta/10 hover:bg-white/30 px-3 rounded-lg transition-all cursor-pointer group/item ${
                        isLargeTextMode ? "py-4 md:py-5" : "py-2.5"
                      }`}
                      title="Kliknij, aby powiększyć"
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1 pt-0.5">
                        <span className={`font-mono text-accent-terracotta bg-accent-terracotta/10 rounded font-bold transition-all shrink-0 flex items-center justify-center ${
                          isLargeTextMode ? "text-[13px] md:text-[14px] px-2.5 py-1" : "text-[11px] px-2 py-0.5"
                        }`}>{item.id}</span>
                        <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide leading-tight transition-all group-hover/item:text-accent-terracotta ${
                          isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                        }`}>{item.name}</span>
                      </div>
                      <div className="flex-grow mx-3 border-b border-dashed border-accent-gold/40"></div>
                      <span className={`font-sans font-bold text-accent-brown whitespace-nowrap transition-all shrink-0 ${
                        isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                      }`}>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-5 bg-[#FAF8F4] border border-accent-gold/25 rounded-2xl flex items-center justify-center gap-3 max-w-xl mx-auto shadow-sm">
                  <Sparkles className="w-5 h-5 text-accent-gold shrink-0" />
                  <p className="font-sans text-[13px] md:text-[14px] font-bold text-accent-brown uppercase tracking-wider">
                    Sos do wyboru: czekoladowy, truskawkowy — 2,00 zł
                  </p>
                </div>
              </div>
            )}

            {activeMenuTab === "savory" && (
              <div className="animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {SAVORY_PANCAKES.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedMenuItem({ ...item, category: "Naleśnik Wytrawny" })}
                      className={`flex items-baseline justify-between border-b border-accent-terracotta/10 hover:bg-white/30 px-3 rounded-lg transition-all cursor-pointer group/item ${
                        isLargeTextMode ? "py-4 md:py-5" : "py-2.5"
                      }`}
                      title="Kliknij, aby powiększyć"
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1 pt-0.5">
                        <span className={`font-mono text-accent-terracotta bg-accent-terracotta/10 rounded font-bold transition-all shrink-0 flex items-center justify-center ${
                          isLargeTextMode ? "text-[13px] md:text-[14px] px-2.5 py-1" : "text-[11px] px-2 py-0.5"
                        }`}>{item.id}</span>
                        <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide leading-tight transition-all group-hover/item:text-accent-terracotta ${
                          isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                        }`}>{item.name}</span>
                      </div>
                      <div className="flex-grow mx-3 border-b border-dashed border-accent-gold/40"></div>
                      <span className={`font-sans font-bold text-accent-brown whitespace-nowrap transition-all shrink-0 ${
                        isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                      }`}>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-5 bg-[#FAF8F4] border border-accent-gold/25 rounded-2xl flex items-center justify-center gap-3 max-w-xl mx-auto shadow-sm">
                  <Leaf className="w-5 h-5 text-accent-gold shrink-0" />
                  <p className="font-sans text-[13px] md:text-[14px] font-bold text-accent-brown uppercase tracking-wider">
                    Sos do wyboru: czosnkowy, koperkowy, pikantny, ketchup — 2,00 zł
                  </p>
                </div>
              </div>
            )}

            {activeMenuTab === "novelties" && (
              <div className="animate-fade-in-up max-w-3xl mx-auto space-y-6">
                {NOVELTIES.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedMenuItem({ ...item, category: "Nowość" })}
                    className={`bg-white/50 rounded-2xl border border-accent-gold/20 shadow-sm hover:border-accent-gold/50 hover:bg-white/80 transition-all hover:scale-[1.01] cursor-pointer group/item ${
                      isLargeTextMode ? "p-8" : "p-6"
                    }`}
                    title="Kliknij, aby powiększyć"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-start gap-2 min-w-0 flex-1 pt-0.5">
                        <span className="inline-block bg-accent-gold/20 text-accent-brown font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shrink-0">Nowość!</span>
                        <h4 className={`font-serif font-bold text-dark-choco transition-all group-hover/item:text-accent-terracotta ${
                          isLargeTextMode ? "text-xl md:text-2xl" : "text-base md:text-lg"
                        }`}>{item.name}</h4>
                      </div>
                      <div className="flex-grow border-b border-dashed border-accent-gold/40 mx-2"></div>
                      <span className={`font-sans font-bold text-accent-brown transition-all shrink-0 ${
                        isLargeTextMode ? "text-xl md:text-2xl" : "text-base md:text-lg"
                      }`}>{item.price}</span>
                    </div>
                    <p className={`font-sans text-text-sub mt-2 italic font-light transition-all ${
                      isLargeTextMode ? "text-sm md:text-base" : "text-xs md:text-sm"
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeMenuTab === "hot" && (
              <div className="animate-fade-in-up max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {HOT_DRINKS.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedMenuItem({ ...item, category: "Napój Gorący" })}
                      className={`flex items-baseline justify-between border-b border-accent-terracotta/10 hover:bg-white/20 px-3 rounded-lg transition-all cursor-pointer group/item ${
                        isLargeTextMode ? "py-4 md:py-5" : "py-2.5"
                      }`}
                      title="Kliknij, aby powiększyć"
                    >
                      <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide transition-all group-hover/item:text-accent-terracotta flex-1 pr-2 ${
                        isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                      }`}>{item.name}</span>
                      <div className="flex-grow mx-3 border-b border-dashed border-accent-gold/40"></div>
                      <span className={`font-sans font-bold text-accent-brown transition-all shrink-0 ${
                        isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                      }`}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenuTab === "drinks" && (
              <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Zimne Napoje */}
                <div className="bg-[#FAF8F4]/40 p-6 rounded-2xl border border-accent-gold/15">
                  <h4 className="font-serif text-lg font-bold text-accent-terracotta border-b-2 border-accent-terracotta/15 pb-2 mb-4 uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <GlassWater className="w-5 h-5" />
                    <span>Napoje Zimne</span>
                  </h4>
                  <div className="space-y-4">
                    {COLD_DRINKS.map((item, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedMenuItem({ ...item, category: "Napój Zimny" })}
                        className={`flex flex-col border-b border-accent-terracotta/5 hover:bg-white/20 px-2.5 py-2 rounded-xl cursor-pointer group/item transition-all ${
                          isLargeTextMode ? "gap-2" : "gap-1"
                        }`}
                        title="Kliknij, aby powiększyć"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide transition-all group-hover/item:text-accent-terracotta flex-1 pr-2 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.name}</span>
                          <span className={`font-sans font-bold text-accent-brown transition-all shrink-0 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.price}</span>
                        </div>
                        {item.desc && (
                          <span className={`text-text-sub italic transition-all ${
                            isLargeTextMode ? "text-[14px] md:text-[15px]" : "text-[12px] md:text-[13px]"
                          }`}>{item.desc}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Piwa */}
                <div className="bg-[#FAF8F4]/40 p-6 rounded-2xl border border-accent-gold/15">
                  <h4 className="font-serif text-lg font-bold text-accent-terracotta border-b-2 border-accent-terracotta/15 pb-2 mb-4 uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <Beer className="w-5 h-5" />
                    <span>Piwa</span>
                  </h4>
                  <div className="space-y-4">
                    {BEERS.map((item, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedMenuItem({ ...item, category: "Piwo" })}
                        className={`flex flex-col border-b border-accent-terracotta/5 hover:bg-white/20 px-2.5 py-2 rounded-xl cursor-pointer group/item transition-all ${
                          isLargeTextMode ? "gap-2" : "gap-1"
                        }`}
                        title="Kliknij, aby powiększyć"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide transition-all group-hover/item:text-accent-terracotta flex-1 pr-2 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.name}</span>
                          <span className={`font-sans font-bold text-accent-brown transition-all shrink-0 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.price}</span>
                        </div>
                        {item.desc && (
                          <span className={`text-text-sub italic transition-all ${
                            isLargeTextMode ? "text-[14px] md:text-[15px]" : "text-[12px] md:text-[13px]"
                          }`}>{item.desc}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drink & Shots */}
                <div className="bg-[#FAF8F4]/40 p-6 rounded-2xl border border-accent-gold/15">
                  <h4 className="font-serif text-lg font-bold text-accent-terracotta border-b-2 border-accent-terracotta/15 pb-2 mb-4 uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <Wine className="w-5 h-5" />
                    <span>Drink & Shots</span>
                  </h4>
                  <div className="space-y-4">
                    {DRINKS_AND_SHOTS.map((item, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedMenuItem({ ...item, category: "Drink & Shots" })}
                        className={`flex flex-col border-b border-accent-terracotta/5 hover:bg-white/20 px-2.5 py-2 rounded-xl cursor-pointer group/item transition-all ${
                          isLargeTextMode ? "gap-2" : "gap-1"
                        }`}
                        title="Kliknij, aby powiększyć"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`font-sans font-bold text-dark-choco uppercase tracking-wide transition-all group-hover/item:text-accent-terracotta flex-1 pr-2 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.name}</span>
                          <span className={`font-sans font-bold text-accent-brown transition-all shrink-0 ${
                            isLargeTextMode ? "text-[17px] md:text-[19px]" : "text-[14px] md:text-[15px]"
                          }`}>{item.price}</span>
                        </div>
                        {item.desc && (
                          <span className={`text-text-sub italic transition-all ${
                            isLargeTextMode ? "text-[14px] md:text-[15px]" : "text-[12px] md:text-[13px]"
                          }`}>{item.desc}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pod tabelą — sekcja napojów */}
          <div className="mt-16 pt-10 border-t border-accent-terracotta/10 text-center max-w-2xl mx-auto" id="drinks-section">
            <h4 className="font-cursive text-2xl md:text-[30px] text-accent-terracotta mb-8">
              A do tego...
            </h4>
            
            <div className="flex flex-row justify-center gap-6 sm:gap-10 flex-wrap">
              <div className="flex flex-col items-center bg-[#FAF8F4]/40 px-6 py-5 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[110px]">
                <Coffee className="w-8 h-8 mb-3 text-accent-terracotta" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Kawa</span>
              </div>
              <div className="flex flex-col items-center bg-[#FAF8F4]/40 px-6 py-5 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[110px]">
                <IceCream className="w-8 h-8 mb-3 text-accent-terracotta" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Lody</span>
              </div>
              <div className="flex flex-col items-center bg-[#FAF8F4]/40 px-6 py-5 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[110px]">
                <GlassWater className="w-8 h-8 mb-3 text-accent-terracotta" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-sub">Napoje</span>
              </div>
              <div className="flex flex-col items-center bg-[#FAF8F4]/40 px-6 py-5 rounded-xl border border-accent-terracotta/5 hover:border-accent-gold/40 hover:scale-105 transition-all duration-300 min-w-[110px]">
                <Leaf className="w-8 h-8 mb-3 text-accent-terracotta" />
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

      {/* 6. SEKCJA IMPREZY & WYDARZENIA — id="imprezy" */}
      <section 
        id="imprezy" 
        className="py-24 bg-warm-cream relative z-10 border-b border-accent-terracotta/10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="events-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — oferta okolicznościowa —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold leading-tight">
              Urodziny, Imprezy & Warsztaty
            </h2>
            <p className="font-sans text-base md:text-lg text-text-sub mt-4 font-light leading-relaxed">
              Naleśnikarnia Spełnione Marzenie to idealne miejsce na Twoje wydarzenie. Nasza przytulna atmosfera, profesjonalne podejście i pyszne menu sprawią, że każda chwila będzie wyjątkowa.
            </p>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-accent-gold/30 shadow-sm fade-in-on-scroll opacity-0" id="events-card">
            {/* 3 główne rodzaje wydarzeń */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Imprezy */}
              <div className="bg-[#FAF8F4]/90 p-6 rounded-2xl border border-accent-gold/15 text-center flex flex-col items-center hover:shadow-md hover:border-accent-terracotta/35 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent-terracotta/10 flex items-center justify-center text-accent-terracotta mb-4">
                  <Cake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-dark-choco mb-2">Imprezy Okolicznościowe</h3>
                <p className="font-sans text-xs text-text-sub leading-relaxed">
                  Urodziny, rocznice, jubileusze, chrzciny oraz spotkania rodzinne i towarzyskie w ciepłym, kameralnym gronie.
                </p>
              </div>

              {/* Warsztaty */}
              <div className="bg-[#FAF8F4]/90 p-6 rounded-2xl border border-accent-gold/15 text-center flex flex-col items-center hover:shadow-md hover:border-accent-terracotta/35 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent-terracotta/10 flex items-center justify-center text-accent-terracotta mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-dark-choco mb-2">Kreatywne Warsztaty</h3>
                <p className="font-sans text-xs text-text-sub leading-relaxed">
                  Zorganizuj warsztaty kulinarne, artystyczne lub tematyczne spotkania dla dzieci i dorosłych w inspirującym otoczeniu.
                </p>
              </div>

              {/* Spotkania biznesowe */}
              <div className="bg-[#FAF8F4]/90 p-6 rounded-2xl border border-accent-gold/15 text-center flex flex-col items-center hover:shadow-md hover:border-accent-terracotta/35 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent-terracotta/10 flex items-center justify-center text-accent-terracotta mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-dark-choco mb-2">Spotkania Biznesowe</h3>
                <p className="font-sans text-xs text-text-sub leading-relaxed">
                  Kameralne spotkania firmowe, rekrutacje, prezentacje, szkolenia i narady biznesowe przy doskonałej, aromatycznej kawie.
                </p>
              </div>
            </div>

            <div className="w-[150px] h-[1px] bg-accent-gold/30 mx-auto mb-10"></div>

            {/* Warunki / Informacje dodatkowe */}
            <div className="max-w-2xl mx-auto">
              <h4 className="font-sans text-xs font-bold uppercase tracking-[2px] text-accent-terracotta text-center mb-6">Informacje dodatkowe i opłaty</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F4]/90 rounded-xl border border-accent-terracotta/10 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-terracotta font-bold block mb-1">Własne ciasto / tort</span>
                  <span className="font-sans text-lg font-bold text-accent-brown">5,00 zł / osoba</span>
                  <p className="text-[11px] text-text-sub italic mt-1">(kaucja za talerzyk)</p>
                </div>
                <div className="p-4 bg-[#FAF8F4]/90 rounded-xl border border-accent-terracotta/10 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-terracotta font-bold block mb-1">Własny alkohol</span>
                  <span className="font-sans text-lg font-bold text-accent-brown">10,00 zł / butelka</span>
                  <p className="text-[11px] text-text-sub italic mt-1">(opłata korkowa)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-accent-terracotta/5 border border-accent-terracotta/10 rounded-2xl text-center max-w-xl mx-auto">
              <p className="font-sans text-sm text-accent-brown font-medium leading-relaxed">
                Chcesz omówić szczegóły Twojego wydarzenia (menu, aranżację sali, rezerwację terminów)?
              </p>
              <p className="font-sans text-xs text-text-sub/80 mt-1.5">
                Skontaktuj się z nami telefonicznie pod numerem <span className="font-bold text-accent-terracotta">693 422 539</span> lub osobiście w lokalu!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6.5. SEKCJA GALERII — id="galeria" */}
      <section 
        id="galeria" 
        className="py-24 bg-warm-cream relative border-b border-accent-terracotta/10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="gallery-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — nasza galeria —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold">
              Galeria Zdjęć
            </h2>
            <p className="font-sans text-base md:text-lg text-text-sub mt-4 font-light leading-relaxed">
              Zobacz naszą przytulną naleśnikarnię, klimatyczne wnętrza oraz pyszne potrawy przygotowywane na miejscu.
            </p>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Masonry ze zdjęciami w oryginalnych proporcjach */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6" id="gallery-grid">
            <AnimatePresence mode="popLayout">
              {GALLERY_IMAGES.slice(0, visibleGalleryCount).map((image, index) => (
                <motion.div 
                  key={image.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: (index % 12) * 0.05
                  }}
                  onClick={() => openLightbox(index)}
                  className="break-inside-avoid block relative overflow-hidden rounded-2xl bg-warm-apricot shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 border border-accent-gold/15 hover:border-accent-gold/45 mb-4 md:mb-6 group"
                >
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay na hover bez podpisów zdjęć */}
                  <div className="absolute inset-0 bg-dark-choco/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Search className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                      <span className="font-sans font-bold text-xs text-white uppercase tracking-widest">
                        Powiększ
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Guzik pokaż więcej / pokaż mniej */}
          <div className="mt-12 text-center" id="gallery-controls">
            {visibleGalleryCount < GALLERY_IMAGES.length ? (
              <button
                onClick={() => setVisibleGalleryCount(prev => Math.min(prev + 12, GALLERY_IMAGES.length))}
                className="inline-flex items-center gap-2 bg-[#68826A] text-white font-sans text-[13px] font-bold uppercase tracking-[2px] px-8 py-4 rounded-full shadow-md hover:bg-[#C59B6D] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pokaż więcej zdjęć</span>
              </button>
            ) : GALLERY_IMAGES.length > 12 && (
              <button
                onClick={() => setVisibleGalleryCount(12)}
                className="inline-flex items-center gap-2 border-2 border-accent-terracotta text-accent-terracotta font-sans text-[13px] font-bold uppercase tracking-[2px] px-8 py-3.5 rounded-full hover:bg-accent-terracotta/10 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Pokaż mniej</span>
              </button>
            )}
          </div>

        </div>

        {/* Lightbox / Modal pełnoekranowy */}
        {lightboxImageIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={closeLightbox}
          >
            {/* Przycisk zamknięcia */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50"
              aria-label="Zamknij"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Kontener na zdjęcie i nawigację */}
            <div 
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Przewijany kontener do przybliżenia */}
              <div 
                className={`w-full max-h-[72vh] flex items-center justify-center rounded-lg transition-all duration-300 ${
                  isZoomed ? "overflow-auto no-scrollbar cursor-zoom-out" : "overflow-hidden cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img 
                  src={GALLERY_IMAGES[lightboxImageIndex].url} 
                  alt={GALLERY_IMAGES[lightboxImageIndex].title}
                  className={`rounded-lg shadow-2xl transition-all duration-300 origin-center ${
                    isZoomed 
                      ? "max-w-none max-h-none w-[150%] md:w-[180%] h-auto" 
                      : "max-w-full max-h-[70vh] object-contain"
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Tytuł i wskazówki zoomu */}
              <div className="mt-4 text-center select-none bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 max-w-md mx-auto">
                <p className="font-mono text-[11px] text-white/60 uppercase tracking-widest leading-none flex items-center justify-center gap-1.5">
                  <span>Zdjęcie {lightboxImageIndex + 1} z {GALLERY_IMAGES.length} • {isZoomed ? "Kliknij, aby oddalić" : "Kliknij, aby powiększyć"}</span>
                  <Search className="w-3 h-3 text-accent-gold" />
                </p>
              </div>

              {/* Strzałka w lewo */}
              <button 
                onClick={showPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-10"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Strzałka w prawo */}
              <button 
                onClick={showNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-10"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
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
              <Utensils className="w-10 h-10 text-accent-gold mx-auto mb-6" />
              <h3 className="font-serif text-xl md:text-2xl text-accent-gold font-bold mb-4">
                Naleśniki Francuskie
              </h3>
              <p className="font-sans text-[14px] text-[#FFF8EE]/75 leading-[1.7] font-light">
                Cienkie, złociste, przygotowywane wyłącznie na świeżo i według sprawdzonej, domowej receptury.
              </p>
            </div>

            {/* Karta 2 */}
            <div className="bg-white/[0.03] border border-accent-gold/25 rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/[0.08] hover:-translate-y-1" id="card-2">
              <Coffee className="w-10 h-10 text-accent-gold mx-auto mb-6" />
              <h3 className="font-serif text-xl md:text-2xl text-accent-gold font-bold mb-4">
                Aromatyczna Kawa
              </h3>
              <p className="font-sans text-[14px] text-[#FFF8EE]/75 leading-[1.7] font-light">
                Do każdego spotkania podajemy kawę, która wita Cię ciepłem i pobudzającym zapiekiem z ekspresu.
              </p>
            </div>

            {/* Karta 3 */}
            <div className="bg-white/[0.03] border border-accent-gold/25 rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/[0.08] hover:-translate-y-1" id="card-3">
              <MapPin className="w-10 h-10 text-accent-gold mx-auto mb-6" />
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

      {/* 7.5. SEKCJA OPINII GOŚCI — id="opinie" */}
      <section 
        id="opinie" 
        className="py-24 bg-warm-cream relative z-10 border-t border-accent-terracotta/10"
      >
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          
          {/* Nagłówek sekcji */}
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-on-scroll opacity-0" id="reviews-header">
            <span className="font-mono text-xs text-accent-terracotta tracking-[4px] uppercase block mb-2">
              — opinie z google maps —
            </span>
            <h2 className="font-serif text-3xl md:text-[48px] text-dark-choco font-bold">
              Co mówią nasi Goście?
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-4">
              <div className="flex text-accent-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                ))}
              </div>
              <span className="font-sans font-semibold text-sm text-dark-choco/85 ml-2">
                5.0 / 5 gwiazdek na Google
              </span>
            </div>
            <div className="w-[60px] h-1 bg-accent-terracotta mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Trzy eleganckie opinie */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-on-scroll opacity-0" id="reviews-grid">
            
            {/* Opinia 1 */}
            <div className="bg-white/60 backdrop-blur-sm border border-accent-gold/20 hover:border-accent-terracotta/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group" id="review-1">
              <div>
                {/* Gwiazdki i logo Google */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-mono tracking-wider text-text-sub font-semibold flex items-center gap-1 bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-accent-gold/15">
                    <span className="text-blue-500 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-500 font-bold">e</span>
                  </span>
                </div>
                
                {/* Treść */}
                <p className="font-sans text-[15px] text-text-sub italic leading-relaxed font-light mb-6">
                  "To jedno z tych miejsc, do których wraca się z sentymentem. „Spełnione Marzenie” nie udaje – to po prostu bardzo dobra naleśnikarnia z duszą prowadzona przez pasjonatów."
                </p>
              </div>

              {/* Autor */}
              <div className="border-t border-accent-gold/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-terracotta/10 text-accent-terracotta flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-dark-choco leading-none">
                    Gość Naleśnikarni
                  </h4>
                  <span className="text-[11px] font-mono text-text-sub/70 block mt-1">
                    Opinia Google
                  </span>
                </div>
              </div>
            </div>

            {/* Opinia 2 */}
            <div className="bg-white/60 backdrop-blur-sm border border-accent-gold/20 hover:border-accent-terracotta/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group" id="review-2">
              <div>
                {/* Gwiazdki i logo Google */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-mono tracking-wider text-text-sub font-semibold flex items-center gap-1 bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-accent-gold/15">
                    <span className="text-blue-500 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-500 font-bold">e</span>
                  </span>
                </div>
                
                {/* Treść */}
                <p className="font-sans text-[15px] text-text-sub italic leading-relaxed font-light mb-6">
                  "Naleśniki na słodko są przepyszne! 😊 Do tego bardzo miła obsługa. Zdecydowanie polecam!…"
                </p>
              </div>

              {/* Autor */}
              <div className="border-t border-accent-gold/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-terracotta/10 text-accent-terracotta flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-dark-choco leading-none">
                    Gość Naleśnikarni
                  </h4>
                  <span className="text-[11px] font-mono text-text-sub/70 block mt-1">
                    Opinia Google
                  </span>
                </div>
              </div>
            </div>

            {/* Opinia 3 */}
            <div className="bg-white/60 backdrop-blur-sm border border-accent-gold/20 hover:border-accent-terracotta/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group" id="review-3">
              <div>
                {/* Gwiazdki i logo Google */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-mono tracking-wider text-text-sub font-semibold flex items-center gap-1 bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-accent-gold/15">
                    <span className="text-blue-500 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-500 font-bold">e</span>
                  </span>
                </div>
                
                {/* Treść */}
                <p className="font-sans text-[15px] text-text-sub italic leading-relaxed font-light mb-6">
                  "Pyszne naleśniki, dobra kawa, niedrogie drinki, polecam wszystkim odwiedzającym Kamien Śląski."
                </p>
              </div>

              {/* Autor */}
              <div className="border-t border-accent-gold/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-terracotta/10 text-accent-terracotta flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-dark-choco leading-none">
                    Gość Naleśnikarni
                  </h4>
                  <span className="text-[11px] font-mono text-text-sub/70 block mt-1">
                    Opinia Google
                  </span>
                </div>
              </div>
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
                <MapPin className="w-6 h-6 text-accent-terracotta flex-shrink-0 mt-1" />
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
                <Phone className="w-6 h-6 text-accent-terracotta flex-shrink-0 mt-1" />
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
                <Mail className="w-6 h-6 text-accent-terracotta flex-shrink-0 mt-1" />
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
                <Facebook className="w-6 h-6 text-accent-terracotta flex-shrink-0 mt-1" />
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.661584009329!2d18.071817912602018!3d50.54046568075927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471101154d7b7e15%3A0x1398f37bafc21325!2sNalesnikarnia%20Spe%C5%82nione%20Marzenie%20-Bronislawa%20Sleziona!5e0!3m2!1spl!2spl!4v1783588861583!5m2!1spl!2spl"
                  className="absolute top-0 left-0 w-full h-full border-b duration-500 scale-100 group-hover:scale-[1.01]" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
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

      {/* MODAL POWIĘKSZENIA POZYCJI MENU */}
      <AnimatePresence>
        {selectedMenuItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMenuItem(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F4] border-[3px] border-accent-gold max-w-xl w-full rounded-3xl p-8 md:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.3)] relative text-center cursor-default"
            >
              {/* Przycisk zamknięcia */}
              <button
                onClick={() => setSelectedMenuItem(null)}
                className="absolute top-4 right-4 text-accent-brown/75 hover:text-accent-terracotta bg-accent-terracotta/10 hover:bg-accent-terracotta/20 p-2.5 rounded-full transition-all cursor-pointer"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Kategoria i ikona */}
              <div className="flex flex-col items-center mb-6">
                <span className="font-mono text-xs text-accent-terracotta tracking-[3px] uppercase block mb-3">
                  — {selectedMenuItem.category || "Menu"} —
                </span>
                <div className="w-16 h-16 rounded-full bg-accent-terracotta/10 flex items-center justify-center text-accent-terracotta mb-4">
                  {selectedMenuItem.id ? (
                    <span className="font-mono text-xl font-bold">{selectedMenuItem.id}</span>
                  ) : (
                    <Utensils className="w-8 h-8" />
                  )}
                </div>
              </div>

              {/* Tytuł i Nazwa (BARDZO DUŻA) */}
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-dark-choco uppercase tracking-wide leading-tight mb-4 select-text">
                {selectedMenuItem.name}
              </h3>

              {/* Linia ozdobna */}
              <div className="w-[80px] h-[2px] bg-accent-gold/50 mx-auto mb-6"></div>

              {/* Opis jeśli istnieje */}
              {selectedMenuItem.desc && (
                <p className="font-sans text-sm md:text-base text-text-sub italic font-light mb-6 bg-white/40 p-4 rounded-xl border border-accent-gold/10 select-text">
                  {selectedMenuItem.desc}
                </p>
              )}

              {/* Cena (OGROMNA) */}
              <div className="inline-block bg-accent-terracotta/10 border border-accent-terracotta/20 px-8 py-4 rounded-2xl">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-terracotta block mb-1">Cena</span>
                <span className="font-sans font-black text-3xl md:text-4xl text-accent-brown select-text">
                  {selectedMenuItem.price}
                </span>
              </div>

              {/* Informacja o sosach/dodatkach jeśli to naleśnik */}
              {selectedMenuItem.category && selectedMenuItem.category.includes("Naleśnik") && (
                <p className="font-sans text-xs text-text-sub/75 mt-6 italic">
                  Zapytaj obsługę o dodatki lub pyszne domowe sosy!
                </p>
              )}

              {/* Przycisk Zamknij pod spodem */}
              <button
                onClick={() => setSelectedMenuItem(null)}
                className="mt-8 w-full py-3.5 bg-accent-terracotta hover:bg-accent-brown text-white font-sans text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Powrót do menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
