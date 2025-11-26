import './App.css';
import React, { useState } from "react";
const team = [
  {
    id: 1,
    name: "Виктор Астахов",
    role: "Ведущий инженер",
    description:
      "Кирилл Козаренко – прирожденный руководитель проектов, главные энергетики крупнейших предприятий РФ отзываются о нем самыми лестными словами.",
    photo:
      "https://bm-electro.ru/assets/cache_image/images/team/4_289x289_864.png",
    email: "danila@example.com",
    phone: "+7 (900) 000-00-01",
    whatsapp: "+79000000001"
  },
  {
    id: 2,
    name: "Кирилл Козаренко",
    role: "Руководитель проектов",
    description:
      "Курирует интеграционные проекты и следит за сроками внедрения решений.",
    photo:
      "https://bm-electro.ru/assets/cache_image/images/team/5_289x289_864.png",
    email: "kirill@example.com",
    phone: "+7 (900) 000-00-02",
    whatsapp: "+79000000002"
  },
  {
    id: 3,
    name: "Максим Егоров",
    role: "Руководитель проектов",
    description:
      "Максим Егоров – руководитель проектов, в прошлом командир взвода. Четкий, хлесткий, если говорит, то только по делу. Предпочитает сложные проекты и безвыходные ситуации.",
    photo:
      "https://bm-electro.ru/assets/cache_image/images/team/image%2028_289x289_864.png",
    email: "maksim@example.com",
    phone: "+7 (900) 000-00-03",
    whatsapp: "+79000000003"
  },
  {
    id: 4,
    name: "Владимир Шашников",
    role: "Начальник испытательной электролаборатории",
    description:
      "Владимир Шашников – начальник испытательной электролаборатории. Всегда строг к замечаниям, выявленным при сдаче объекта. Влюблен в свой мотоцикл.",
    photo:
      "https://bm-electro.ru/assets/cache_image/images/team/2%20(2)_289x289_864.png",
    email: "vladimir@example.com",
    phone: "+7 (900) 000-00-04",
    whatsapp: "+79000000004"
  }
];

function useCarousel(length, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);

  const prev = () => setIndex((i) => (i - 1 + length) % length);
  const next = () => setIndex((i) => (i + 1) % length);

  return { index, setIndex, prev, next };
}

function ContactButtons({ email, phone, whatsapp }) {

  const wa = whatsapp.replace(/[^+0-9]/g, "");

  return (
    <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-center gap-4 text-gray-300 text-sm">
      <a
        href={`mailto:${email}`}
        className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition"
        aria-label="Написать на email"
      >
        @
      </a>
      <a
        href={`tel:${phone}`}
        className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition"
        aria-label="Позвонить"
      >
        📞
      </a>
      <a
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noreferrer"
        className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 transition"
        aria-label="Написать в WhatsApp"
      >
        W
      </a>
    </div>
  );
}

// Вариант 1 — 3 карточки одновременно, классический вариант
function TeamCarouselVariant1() {
  const { index, prev, next } = useCarousel(team.length);

  const visible = [0, 1, 2].map((offset) => team[(index + offset) % team.length]);

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Наша команда — вариант 1</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visible.map((member) => (
          <article
            key={member.id}
            className="bg-gray-900/80 rounded-2xl overflow-hidden shadow-xl border border-gray-800 flex flex-col"
          >
            <div className="relative">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-64 object-cover h-120"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-gray-300">{member.role}</p>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-sm text-gray-300 mb-4">{member.description}</p>
              <ContactButtons
                email={member.email}
                phone={member.phone}
                whatsapp={member.whatsapp}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Вариант 2 — одна крупная карточка по центру, остальные — в виде точек
function TeamCarouselVariant2() {
  const { index, setIndex, prev, next } = useCarousel(team.length);
  const current = team[index];

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Наша команда — вариант 2</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8594;
          </button>
        </div>
      </div>

      <article className="bg-gray-900/90 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <img
            src={current.photo}
            alt={current.name}
            className="w-full h-80 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <p className="text-sm text-amber-400 uppercase tracking-[0.15em] mb-2">
            Ключевой специалист
          </p>
          <h3 className="text-3xl font-semibold text-white mb-2">{current.name}</h3>
          <p className="text-lg text-gray-300 mb-4">{current.role}</p>
          <p className="text-sm text-gray-300 mb-4 max-w-xl">
            {current.description}
          </p>
          <ContactButtons
            email={current.email}
            phone={current.phone}
            whatsapp={current.whatsapp}
          />

          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {team.map((member, i) => (
              <button
                key={member.id}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index
                    ? "bg-amber-400 w-7"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={member.name}
              />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

// Вариант 3 — горизонтальная карусель карточек с эффектом "галереи"
function TeamCarouselVariant3() {
  const { index, prev, next } = useCarousel(team.length);

  // Показываем 1 активную + две по бокам с уменьшением
  const getOffsetIndex = (offset) => (index + offset + team.length) % team.length;

  const center = team[getOffsetIndex(0)];
  const left = team[getOffsetIndex(-1)];
  const right = team[getOffsetIndex(1)];

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Наша команда — вариант 3</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-6">
        {/* Левая карточка */}
        <article className="hidden md:block w-64 opacity-40 scale-90 transform transition-all bg-gray-900/70 rounded-2xl border border-gray-800 overflow-hidden">
          <img
            src={left.photo}
            alt={left.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white truncate">{left.name}</h3>
            <p className="text-xs text-gray-400 truncate">{left.role}</p>
            <ContactButtons
              email={left.email}
              phone={left.phone}
              whatsapp={left.whatsapp}
            />
          </div>
        </article>

        {/* Центральная карточка */}
        <article className="w-full max-w-xl bg-gray-900 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-[260px,1fr]">
            <div className="relative">
              <img
                src={center.photo}
                alt={center.name}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/60 text-xs text-amber-300 px-3 py-1 rounded-full uppercase tracking-[0.15em]">
                Эксперт
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-white mb-1">{center.name}</h3>
              <p className="text-sm text-amber-300 mb-3">{center.role}</p>
              <p className="text-sm text-gray-300 mb-4">{center.description}</p>
              <ContactButtons
                email={center.email}
                phone={center.phone}
                whatsapp={center.whatsapp}
              />
              <div className="flex gap-3 text-xs text-gray-400 mt-4">
                <span className="px-3 py-1 rounded-full bg-gray-800/80">
                  Опыт 10+ лет
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-800/80">
                  Проекты под ключ
                </span>
              </div>
            </div>
          </div>
        </article>
        <article className="hidden md:block w-64 opacity-40 scale-90 transform transition-all bg-gray-900/70 rounded-2xl border border-gray-800 overflow-hidden">
          <img
            src={right.photo}
            alt={right.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white truncate">{right.name}</h3>
            <p className="text-xs text-gray-400 truncate">{right.role}</p>
            <ContactButtons
              email={right.email}
              phone={right.phone}
              whatsapp={right.whatsapp}
            />
          </div>
        </article>
      </div>
    </section>
  );
}


function TeamCarouselVariant4() {
  const { index, prev, next } = useCarousel(team.length);

  const visible = [0, 1, 2].map((offset) => team[(index + offset) % team.length]);

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Наша команда — вариант 4</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visible.map((member) => (
          <article
            key={member.id}
            className="group relative bg-gray-900/90 rounded-2xl overflow-hidden border border-gray-800 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:-translate-x-1 h-120"
          >
            {/* Базовая карточка с фото и ФИО */}
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-64 object-cover h-120"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
              <ContactButtons
                email={member.email}
                phone={member.phone}
                whatsapp={member.whatsapp}
              />
            </div>

            {/* Описание, выезжающее при наведении */}
            <div className="absolute inset-0 bg-black/90 p-6 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-sm text-amber-300 mb-3">{member.role}</p>
                <p className="text-sm text-gray-300 mb-4">{member.description}</p>
              </div>
              <ContactButtons
                email={member.email}
                phone={member.phone}
                whatsapp={member.whatsapp}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function App() {
   return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-12 md:px-16 md:py-16 space-y-20">
      <TeamCarouselVariant1 />
      <TeamCarouselVariant2 />
      <TeamCarouselVariant3 />
      <TeamCarouselVariant4 />
    </div>
  );
}

export default App;
