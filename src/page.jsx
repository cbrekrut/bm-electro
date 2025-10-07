import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, PartyPopper, Gift, Sparkles, Crown, Star, Music } from "lucide-react";

// Стильное слайд‑шоу с авто‑перелистыванием, прогресс‑баром, кнопками и клавишами/свайпами
const DURATION_MS = 100; // время показа одного слайда

const SLIDES = [
  { id: 1,  title: "С Днём Рождения!",         subtitle: "Пусть сбывается всё, что задумано",         icon: <PartyPopper className="w-8 h-8"/>, bg: "from-fuchsia-500 via-violet-500 to-indigo-500" },
  { id: 2,  title: "Радости каждый день",       subtitle: "Пусть жизнь искрится улыбками",             icon: <Sparkles className="w-8 h-8"/>,   bg: "from-teal-500 via-cyan-500 to-blue-500" },
  { id: 3,  title: "Исполнения мечт",           subtitle: "Мечты → планы → победы",                    icon: <Crown className="w-8 h-8"/>,       bg: "from-rose-500 via-orange-500 to-amber-500" },
  { id: 4,  title: "Крепкого здоровья",          subtitle: "Энергии на великие дела",                  icon: <Star className="w-8 h-8"/>,        bg: "from-emerald-500 via-lime-500 to-yellow-500" },
  { id: 5,  title: "Тепла от близких",           subtitle: "Любви, поддержки и уютных встреч",         icon: <Gift className="w-8 h-8"/>,        bg: "from-sky-500 via-indigo-500 to-purple-500" },
  { id: 6,  title: "Ярких впечатлений",          subtitle: "Больше путешествий и открытий",            icon: <Sparkles className="w-8 h-8"/>,   bg: "from-pink-500 via-red-500 to-orange-500" },
  { id: 7,  title: "Музыки в душе",              subtitle: "Пусть каждый день звучит гармонично",      icon: <Music className="w-8 h-8"/>,       bg: "from-blue-500 via-indigo-600 to-slate-800" },
  { id: 8,  title: "Больших достижений",         subtitle: "Ты можешь больше, чем думаешь",            icon: <Star className="w-8 h-8"/>,        bg: "from-amber-500 via-yellow-500 to-emerald-500" },
];

function useAutoplay({ isPlaying, onTick, duration = DURATION_MS }) {
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    let stopped = false;

    const loop = (t) => {
      if (!startRef.current) startRef.current = t;
      const d = t - startRef.current;
      setElapsed(d);
      if (d >= duration) {
        onTick?.();
        startRef.current = t;
        setElapsed(0);
      }
      if (!stopped) rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
      startRef.current = 0;
    };
  }, [isPlaying, duration, onTick]);

  return { elapsed };
}

const Progress = ({ value }) => (
  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
    <motion.div
      className="h-full bg-white/90"
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ ease: "linear", duration: 0.08 }}
    />
  </div>
);

const ControlButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/10 hover:bg-white/15 text-white backdrop-blur-md transition shadow-sm border border-white/15"
    aria-label={label}
  >
    {icon}
    <span className="text-sm hidden sm:inline">{label}</span>
  </button>
);

const Slide = ({ slide, index, direction }) => {
  return (
    <motion.div
      key={slide.id}
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, x: direction === "next" ? 64 : -64, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: direction === "next" ? -64 : 64, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {/* Градиентный фон */}
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />

        {/* Декоративные пятна */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 blur-3xl rounded-full" />

        {/* Контент */}
        <div className="relative z-10 h-full flex items-center justify-center p-6">
          <div className="w-full max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 ring-1 ring-white/15 backdrop-blur-md mb-4">
              {slide.icon}
              <span className="text-sm tracking-wide">Happy Birthday</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              {slide.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Номер слайда */}
        <div className="absolute bottom-6 right-6 text-white/80 text-sm select-none">
          {index + 1} / {SLIDES.length}
        </div>
      </div>
    </motion.div>
  );
};

export default function BirthdaySlideshow() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState("next");

  const { elapsed } = useAutoplay({
    isPlaying,
    onTick: () => {
      setDirection("next");
      setIndex((i) => (i + 1) % SLIDES.length);
    },
    duration: DURATION_MS,
  });

  const progress = Math.min(100, (elapsed / DURATION_MS) * 100);

  const goNext = () => {
    setDirection("next");
    setIndex((i) => (i + 1) % SLIDES.length);
  };
  const goPrev = () => {
    setDirection("prev");
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  // Управление клавиатурой
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") setIsPlaying((p) => !p); // Space
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Свайпы на мобильных
  const touchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    if (Math.abs(dx) > 50) (dx < 0 ? goNext() : goPrev());
  };

  const slide = SLIDES[index];

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white flex items-center justify-center p-4 select-none">
      <div
        className="relative w-full max-w-6xl aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Слой слайдов */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" initial={false}>
            <Slide key={slide.id} slide={slide} index={index} direction={direction} />
          </AnimatePresence>
        </div>

        {/* Верхняя панель: индикаторы / прогресс */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <div key={s.id} className="flex-1">
              {i === index ? (
                <Progress value={progress} />
              ) : (
                <div className="w-full h-1.5 rounded-full bg-white/15" />
              )}
            </div>
          ))}
        </div>

        {/* Нижняя панель управления */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-between px-4">
          <div className="hidden sm:block text-white/80 text-sm">
            ← → — переключение, Space — пауза
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ControlButton icon={<ArrowLeft className="w-5 h-5" />} label="Назад" onClick={goPrev} />
            <ControlButton
              icon={isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              label={isPlaying ? "Пауза" : "Играть"}
              onClick={() => setIsPlaying((p) => !p)}
            />
            <ControlButton icon={<ArrowRight className="w-5 h-5" />} label="Вперёд" onClick={goNext} />
          </div>
        </div>

        {/* Буллеты */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
              aria-label={`Перейти к слайду ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
