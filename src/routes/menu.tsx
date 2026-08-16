import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { menuCategories, type MenuCategory } from "@/data/menuData";
import { motion, AnimatePresence } from "framer-motion";
import { SandwichAnimation } from "@/components/animations/SandwichAnimation";
import { CoffeeAnimation } from "@/components/animations/CoffeeAnimation";
import { BubbleAnimation } from "@/components/animations/BubbleAnimation";
import { FlipAnimation } from "@/components/animations/FlipAnimation";
import { BurgerIntroVideo } from "@/components/animations/BurgerIntroVideo";
import { CategoryVideo } from "@/components/animations/CategoryVideo";
import { useEffect, useRef, useState } from "react";
import coffeeVideo from "@/assets/coffee-anmation.mp4";
import juiceVideo from "@/assets/juice-anmation.mp4";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Griffin Coffee — El-Mahalla El-Kubra" },
      {
        name: "description",
        content:
          "Browse the full Griffin Coffee menu: specialty espresso, cold brews, sourdough meals, breakfast plates and desserts in El-Mahalla El-Kubra.",
      },
      { property: "og:title", content: "Menu | Griffin Coffee" },
      {
        property: "og:description",
        content:
          "The full Griffin Coffee menu — specialty coffee, sourdough meals and desserts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Intro Video - plays once on page load */}
      {showIntro && (
        <BurgerIntroVideo onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Menu - shown after video */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            className="min-h-screen bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="pt-16 sm:pt-20">
              <section className="px-6 py-14 text-center sm:py-20">
                <h1 className="font-display text-4xl uppercase tracking-[0.2em] text-copper sm:text-6xl">
                  Menu Griffin
                </h1>
                <div className="rule-copper mx-auto mt-6 w-48" />
                <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
                  Specialty coffee, sourdough kitchen and desserts — served all day, every day
                  from 7:30 AM to 1:00 AM.
                </p>
              </section>

              {/* Categories Section */}
              <section className="mx-auto max-w-7xl px-6 pb-20">
                {menuCategories.map((category, index) => (
                  <CategorySection key={category.id} category={category} index={index} />
                ))}
              </section>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Category Section Component
function CategorySection({
  category,
  index,
}: {
  category: MenuCategory;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Check if this is the Coffee Drinks category or Fresh Juice
  const isCoffeeDrinks = category.id === "coffee-drinks";
  const isFreshJuice = category.id === "fresh-juice";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);

          // Trigger video for Coffee Drinks
          if (isCoffeeDrinks && !videoCompleted) {
            console.log("Coffee Drinks is visible - triggering video");
            setShowVideo(true);
          }

          // Trigger video for Fresh Juice
          if (isFreshJuice && !videoCompleted) {
            console.log("Fresh Juice is visible - triggering video");
            setShowVideo(true);
          }
        }
      },
      { threshold: 0.3 } // Lower threshold to trigger earlier
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, isCoffeeDrinks, isFreshJuice, videoCompleted]);

  return (
    <>
      {/* Coffee Video - plays when scrolling to Coffee Drinks */}
      {isCoffeeDrinks && showVideo && !videoCompleted && (
        <CategoryVideo
          videoSrc={coffeeVideo}
          isVisible={showVideo}
          onComplete={() => {
            setVideoCompleted(true);
            setShowVideo(false);
          }}
        />
      )}

      {/* Juice Video - plays when scrolling to Fresh Juice */}
      {isFreshJuice && showVideo && !videoCompleted && (
        <CategoryVideo
          videoSrc={juiceVideo}
          isVisible={showVideo}
          onComplete={() => {
            setVideoCompleted(true);
            setShowVideo(false);
          }}
        />
      )}

      <motion.div
        ref={categoryRef}
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Side - Category Image */}
        <div className="relative overflow-hidden rounded-lg">
          <motion.div
            className="relative"
            initial={{ height: 400 }}
            animate={{ height: 400 }}
            transition={{ 
              duration: 6, 
              times: [0, 0.15, 1],
              ease: "easeInOut"
            }}
          >
            <div className="relative h-full min-h-[400px]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Animation Overlay - triggers only when visible */}
              <AnimationOverlay animation={category.animation} isVisible={isVisible} />

              {/* Category Name */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="font-display text-4xl uppercase tracking-wider text-copper lg:text-5xl">
                  {category.name}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Products List */}
        <div className="flex flex-col">
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="group cursor-pointer rounded-lg border border-copper/10 bg-card p-4 transition-all hover:border-copper/40 hover:shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: itemIndex * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-foreground group-hover:text-copper lg:text-lg">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-display text-lg text-copper lg:text-xl">
                      {item.price} LE
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}

// Advanced Animation Overlay Component with layered animations
function AnimationOverlay({
  animation,
  isVisible,
}: {
  animation: MenuCategory["animation"];
  isVisible: boolean;
}) {
  // All animations disabled - using intro video instead
  return null;
}
