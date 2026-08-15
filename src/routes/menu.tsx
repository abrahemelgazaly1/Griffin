import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { menuCategories, type MenuCategory, type MenuItem } from "@/data/menuData";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
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

        {/* Categories Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory?.id === category.id}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </section>

        {/* Side Panel for Items */}
        <AnimatePresence>
          {selectedCategory && (
            <ItemsPanel
              category={selectedCategory}
              hoveredItem={hoveredItem}
              onHoverItem={setHoveredItem}
              onClose={() => setSelectedCategory(null)}
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// Category Card Component
function CategoryCard({
  category,
  isSelected,
  onClick,
}: {
  category: MenuCategory;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-copper/20 bg-card shadow-lg transition-all hover:shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Animation Overlay */}
        <AnimationOverlay animation={category.animation} isActive={isHovered} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-display text-2xl uppercase tracking-wider text-copper">
          {category.name}
        </h3>
        <motion.div
          className="mt-3 text-xs uppercase tracking-widest text-copper/80"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
        >
          Click to explore →
        </motion.div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-copper text-white shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

// Animation Overlay Component
function AnimationOverlay({
  animation,
  isActive,
}: {
  animation: MenuCategory["animation"];
  isActive: boolean;
}) {
  if (animation === "ice-fall" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              top: "110%",
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            ❄️
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation === "steam" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-10 text-3xl opacity-60"
            style={{ left: `${20 + i * 10}%` }}
            animate={{
              y: [-20, -80],
              opacity: [0.6, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          >
            💨
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation === "sparkle" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation === "flip" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-6xl"
          animate={{
            rotateY: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🥞
        </motion.div>
      </div>
    );
  }

  if (animation === "stack" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            animate={{
              y: [0, -15 * i, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            🥞
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation === "slice" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-5xl"
          animate={{
            x: [-30, 30, -30],
            rotate: [-15, 15, -15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍞
        </motion.div>
      </div>
    );
  }

  if (animation === "bubble" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 text-2xl"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -150],
              scale: [0.5, 1.2],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          >
            🫧
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation === "shake" && isActive) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-6xl"
          animate={{
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🥤
        </motion.div>
      </div>
    );
  }

  return null;
}

// Items Panel Component
function ItemsPanel({
  category,
  hoveredItem,
  onHoverItem,
  onClose,
}: {
  category: MenuCategory;
  hoveredItem: MenuItem | null;
  onHoverItem: (item: MenuItem | null) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Side Panel */}
      <motion.div
        className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-background shadow-2xl sm:w-[500px]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-copper/20 bg-background/95 p-6 backdrop-blur">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-2xl text-muted-foreground hover:text-copper"
          >
            ✕
          </button>
          <h2 className="font-display text-3xl uppercase tracking-wider text-copper">
            {category.name}
          </h2>
        </div>

        {/* Items List */}
        <div className="p-6">
          <div className="space-y-4">
            {category.items.map((item, index) => (
              <motion.div
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-copper/10 bg-card p-4 transition-all hover:border-copper/40 hover:shadow-lg"
                onHoverStart={() => onHoverItem(item)}
                onHoverEnd={() => onHoverItem(null)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-copper">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-display text-xl text-copper">{item.price} LE</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
