import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Carousel = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Carousel;

const cards = [
  {
    url: "/img/1.jpg",
    title: "Make up",
    id: 1,
  },
  {
    url: "/img/2.jpg",
    title: "Oil",
    id: 2,
  },
  {
    url: "/img/3.jpg",
    title: "Accessories",
    id: 3,
  },
  {
    url: "/img/4.jpg",
    title: "Cream",
    id: 4,
  },
  {
    url: "/img/5.jpg",
    title: "Perfume",
    id: 5,
  },
  {
    url: "/img/6.jpg",
    title: "Facewash",
    id: 6,
  },
  {
    url: "/img/7.jpg",
    title: "Fragment",
    id: 7,
  },
  {
    url: "/img/8.jpg",
    title: "Shampoo",
    id: 8,
  },
];