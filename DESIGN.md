# Griffin Coffee - Menu Page Design System

## Overview
This document describes the complete design system for the Griffin Coffee menu page, including layout, typography, colors, spacing, animations, and all menu items with pricing.

---

## Colors

### Brand Colors
- **Copper (Primary)**: `#B87333` - Used for headings, prices, hover states, and accents
- **Background**: `hsl(var(--background))` - Main page background
- **Card Background**: `hsl(var(--card))` - Product card background
- **Foreground**: `hsl(var(--foreground))` - Primary text color
- **Muted Foreground**: `hsl(var(--muted-foreground))` - Secondary text color

### Overlays & Effects
- **Gradient Overlay**: `bg-gradient-to-t from-black/80 via-black/40 to-transparent` - Applied over category images
- **Border**: `border-copper/10` (hover: `border-copper/40`) - Card borders
- **Shadow**: `hover:shadow-lg` - Card hover effect
- **Video Overlay**: `bg-black` - Full-screen video background

---

## Typography

### Headings
- **Main Menu Title**: 
  - Font: Display font (serif)
  - Size: `text-4xl sm:text-6xl` (36px mobile, 60px desktop)
  - Tracking: `tracking-[0.2em]` (0.2em letter spacing)
  - Transform: `uppercase`
  - Color: Copper

- **Category Name**:
  - Font: Display font (serif)
  - Size: `text-3xl sm:text-4xl lg:text-5xl` (30px mobile, 36px tablet, 48px desktop)
  - Tracking: `tracking-wider`
  - Transform: `uppercase`
  - Color: Copper

- **Product Name**:
  - Font: Sans-serif
  - Size: `text-base lg:text-lg` (16px mobile, 18px desktop)
  - Weight: `font-medium`
  - Color: Foreground (hover: Copper)

### Body Text
- **Menu Description**:
  - Size: `text-sm` (14px)
  - Color: Muted foreground
  - Max width: `max-w-xl` (36rem)

- **Product Description**:
  - Size: `text-xs` (12px)
  - Color: Muted foreground

### Prices
- **Price Display**:
  - Font: Display font (serif)
  - Size: `text-lg lg:text-xl` (18px mobile, 20px desktop)
  - Color: Copper
  - Format: `XX.XX LE` (Egyptian Pounds)

---

## Layout & Spacing

### Page Structure
```
┌─────────────────────────────────────┐
│         Navbar (fixed)              │
├─────────────────────────────────────┤
│  Intro Video (burger-anmation.mp4) │ ← Plays once on load
├─────────────────────────────────────┤
│         Menu Title Section          │
│    "Menu Griffin" + Divider         │
│         Description                 │
├─────────────────────────────────────┤
│      Category 1 (Accordion)         │ ← Click to expand
│  ┌─────────────────────────────┐   │
│  │   Category Image + Name     │   │
│  │   (300px mobile, 400px     │   │
│  │        desktop height)      │   │
│  └─────────────────────────────┘   │
│  ▼ Products List (when open)       │
│  ┌─────────────────────────────┐   │
│  │  Product Card               │   │
│  │  Name | Price               │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│      Category 2 (Coffee)            │
│  → Video plays when scrolled to     │
├─────────────────────────────────────┤
│      Category 3+ (more...)          │
├─────────────────────────────────────┤
│         Footer                      │
└─────────────────────────────────────┘
```

### Container Widths
- **Max Width**: `max-w-7xl` (80rem / 1280px)
- **Padding**: `px-6` (24px horizontal)
- **Page Padding Top**: `pt-16 sm:pt-20` (64px mobile, 80px desktop)

### Section Spacing
- **Category Margin Bottom**: `mb-8` (32px)
- **Products Space**: `space-y-3` (12px between cards)
- **Card Padding**: `p-4` (16px)
- **Category Header Padding**: `p-6 sm:p-8` (24px mobile, 32px desktop)

---

## Components

### Category Card (Accordion)
```tsx
Dimensions:
- Height: 300px (mobile), 400px (desktop)
- Width: 100% of container
- Border Radius: rounded-lg (0.5rem)
- Overflow: hidden

States:
- Closed: Only image and name visible
- Open: Image + name + products list
- Hover: Subtle scale animation on products

Animation:
- Arrow rotation: 0° (closed) → 180° (open)
- Duration: 0.3s
- Products fade in: opacity 0 → 1
- Products slide in: translateX -20px → 0
```

### Product Card
```tsx
Dimensions:
- Padding: 16px all sides
- Border: 1px solid copper/10
- Border Radius: rounded-lg (0.5rem)
- Background: Card color

Layout:
┌────────────────────────────────┐
│  Product Name        Price LE  │
│  Description (optional)        │
└────────────────────────────────┘

Hover State:
- Border: copper/40 (stronger)
- Shadow: lg
- Scale: 1.02
- Product name color: Copper

Transition: all properties 0.2s ease
```

### Video Player (Intro & Category Videos)
```tsx
Dimensions:
- Position: fixed, full screen
- Width: 100vw
- Height: 100vh
- Object Fit: cover

Behavior:
- Autoplay: true
- Muted: true
- PlayInline: true (mobile)
- Controls: false
- Plays once: true

Fade:
- Fade in: 0.3s
- Fade out: 0.5s
- After video ends: 0.3s delay
```

---

## Responsive Breakpoints

```css
/* Mobile First */
Default: < 640px

sm: 640px  {
  - Text sizes increase
  - Padding increases
  - Category height: 400px
}

lg: 1024px {
  - Even larger text
  - More spacing
  - Enhanced hover effects
}
```

---

## Animations & Interactions

### Page Load Sequence
1. **Burger Video** plays (full screen)
2. Video fades out after completion
3. Menu page fades in (0.5s)
4. Categories appear with stagger (0.1s delay each)

### Scroll-Triggered Videos
- **Coffee Drinks**: coffee-anmation.mp4 plays when scrolled into view (30% threshold)
- **Fresh Juice**: juice-anmation.mp4 plays when scrolled into view (30% threshold)
- Each video plays **once only** per session

### Accordion Animation
```tsx
Trigger: Click on category
Duration: 0.4s
Easing: easeInOut

Changes:
- Height: 0 → auto
- Opacity: 0 → 1
- Arrow: rotate 0° → 180°
- Products: slide from left (-20px → 0)
```

### Hover Effects
```tsx
Product Card:
- Scale: 1.0 → 1.02
- Border: copper/10 → copper/40
- Text color: foreground → copper
- Shadow: none → lg
- Duration: 0.2s

Category Card:
- Cursor: pointer
- Smooth transition on all states
```

---

## Menu Categories & Items

### 🍔 FOOD SECTION

#### 1. Sourdough
**Image**: Sourdough.jpeg
**Animation**: stack (burger building)

- Pastrami Scramble Sourdough — 180.00 LE
- Smoked Turkey Sourdough — 180.00 LE
- Olive Cheese Sourdough — 200.00 LE
- Olive Kiri Sourdough — 200.00 LE

#### 2. Breakfast
**Image**: Break fast and club sandwiches.jpeg
**Animation**: slice

- Classic Omelette — 149.99 LE
- Griffin Breakfast — 199.99 LE
- Japanese Breakfast — 179.99 LE
- Bikini Scramble — 179.99 LE
- Cheesy Omelette — 189.99 LE
- Cheese Platter — 189.99 LE
- Smoked Turkey Omelette — 199.99 LE
- Cheese & Beef Platter — 189.99 LE

#### 3. Club Sandwiches
**Image**: Break fast and club sandwiches.jpeg
**Animation**: slice

- Croque Madame — 139.99 LE
- Croque Pastrami — 129.99 LE
- Smoked Rocket Club — 144.99 LE
- Mix Cheese Club — 149.99 LE
- Smoked Omelette Club — 139.99 LE

#### 4. Extras
**Image**: extras.jpeg
**Animation**: sparkle

- Extra Mozzarella — 24.99 LE
- Green Salad — 74.99 LE
- Cheese Sauce — 29.99 LE
- Extra Pastrami — 29.99 LE
- Extra Mushrooms — 29.99 LE
- Extra Toast — 14.99 LE
- Extra Smoked Beef — 29.99 LE
- Extra Smoked Turkey — 29.99 LE
- Wedges Potatoes — 49.99 LE
- Hash Browns Potatoes — 54.99 LE
- French Fries — 49.99 LE

#### 5. Croissant
**Image**: Croissant.jpeg
**Animation**: flip

- Plain Croissant — 64.99 LE
- Cheese Croissant — 84.99 LE
- Smoked Beef Croissant — 129.99 LE
- Smoked Turkey Croissant — 119.99 LE
- Mix Cheese Croissant — 139.99 LE
- Mix Smoked Croissant — 119.99 LE
- Croissant Roll Pistachio — 124.99 LE
- Croissant Roll Nutella — 119.99 LE
- Croissant Roll Plain — 74.99 LE

#### 6. Cakes
**Image**: Cake.jpeg
**Animation**: sparkle

- English Cake — 64.99 LE
- Chocolate Brookies — 99.99 LE
- Chocolate Travell — 129.99 LE
- Cheese Cake — 129.99 LE
- Honey Cake — 109.99 LE
- French Toast — 139.99 LE
- Molten Chocolate — 119.99 LE
- Tiramisu — 139.99 LE
- Blueberry San Sebastian — 129.99 LE
- Kinder San Sebastian — 129.99 LE
- Lotus San Sebastian — 129.99 LE
- Nutella San Sebastian — 129.99 LE
- Pistachio San Sebastian — 129.99 LE
- Donuts Boston Cream — 79.99 LE
- Muffin Chocolate — 59.99 LE
- Muffin Blueberry — 64.99 LE
- Muffin Vanilla — 59.99 LE
- Salted Caramel Cake — 129.99 LE

#### 7. Pancakes
**Image**: Ban cake.jpeg
**Animation**: flip

- Classic Mini Pancake — 94.99 LE
- Pistachio Mini Pancake — 134.99 LE
- Kinder Mini Pancake — 124.99 LE
- Lotus Mini Pancake — 119.99 LE
- Nutella Mini Pancake — 109.99 LE
- Caramel Mega Pancake — 94.99 LE
- Lotus Mega Pancake — 109.99 LE
- Kinder Mega Pancake — 109.99 LE
- Nutella Mega Pancake — 104.99 LE

#### 8. Waffle
**Image**: Waffle.jpeg
**Animation**: flip

- Blueberry Waffle — 119.99 LE
- Kinder Waffle — 139.99 LE
- Nutella Waffle — 145.99 LE
- Lotus Waffle — 149.99 LE
- Caramel Waffle — 119.99 LE
- Chocolate Waffle — 119.99 LE
- Four Season Waffle — 159.99 LE
- Pistachio Waffle — 169.99 LE
- Strawberry Waffle — 119.99 LE

#### 9. Crepe
**Image**: Crepe.jpeg
**Animation**: flip

- Fettuccine Kinder — 149.99 LE
- Fettuccine Lotus — 154.99 LE
- Fettuccine Pistachio — 184.44 LE
- Fettuccine Nutella — 144.99 LE
- Ice Crepe — 174.99 LE
- Ice Crepe Pistachio — 189.99 LE
- Konafa Pistachio Crepe — 184.99 LE
- Lotus Sushi Crepe — 154.99 LE
- Nutella Sushi Crepe — 144.99 LE
- Oreo Sushi Crepe — 144.99 LE

---

### ☕ COFFEE SECTION

#### 10. Coffee Drinks
**Image**: Coffee drinks.jpeg
**Animation**: steam
**🎬 Video**: coffee-anmation.mp4 (plays when scrolled into view)

- Turkish Coffee - Small — 49.99 LE
- Turkish Coffee - Double — 64.99 LE
- French Coffee - Small — 69.99 LE
- French Coffee - Double — 79.99 LE
- Espresso - Small — 49.99 LE
- Espresso - Double — 64.99 LE
- Macchiato - Small — 59.99 LE
- Macchiato - Double — 69.99 LE
- Conpana — 74.99 LE
- Spanish Espresso — 79.99 LE
- Affogato — 69.99 LE
- Cappuccino — 94.99 LE
- Latte — 94.99 LE
- Cinnamon Latte — 114.99 LE
- Spanish Latte — 114.99 LE
- Flat White — 94.99 LE
- Americano — 74.99 LE
- Mocha — 115.99 LE
- Lotus Latte — 129.99 LE

#### 11. Specialty Coffee
**Image**: Sepcialty coffee.jpeg
**Animation**: steam

- V60 — 119.99 LE
- Chemex — 129.99 LE
- Syphon — 119.99 LE
- Cold Brew — 74.99 LE
- Aeropress — 119.99 LE
- French Press — 124.99 LE
- Calita — 119.99 LE

#### 12. Cortado Coffee
**Image**: Crotado coffee.jpeg
**Animation**: steam

- Classic Corto — 79.99 LE
- Caramel Corto — 84.99 LE
- Vanilla Corto — 84.99 LE
- Mocha Corto — 84.99 LE
- Irish Corto — 84.99 LE
- Hazelnut Corto — 84.99 LE

#### 13. Hot Chocolate
**Image**: Hot chocolate.jpeg
**Animation**: steam

- Hot Chocolate — 99.99 LE
- Orange Hot Chocolate — 119.99 LE
- Cinnamon Hot Chocolate — 119.99 LE
- Strawberry Hot Chocolate — 119.99 LE
- Irish Hot Chocolate — 119.99 LE
- Lemon Hot Chocolate — 119.99 LE
- Salted Caramel Hot Chocolate — 119.99 LE
- Cookies Hot Chocolate — 129.99 LE

#### 14. Hot Drinks
**Image**: Hot drinkes.jpeg
**Animation**: steam

- Cedar Apple — 74.99 LE
- Tea (Regular) — 39.99 LE
- Tea (Flavors) — 49.99 LE
- Anise — 49.99 LE
- Mint — 49.99 LE

#### 15. Signature
**Image**: Signature.jpeg
**Animation**: sparkle

- Rose Latte — 119.99 LE
- Cookies Latte — 119.99 LE
- Matcha Rose — 134.99 LE
- Shaken Whitenut — 124.99 LE
- Matcha Spanish Latte — 129.99 LE
- Pistachio Latte — 139.99 LE
- Coconut Mocha — 134.99 LE
- Mixed Popping — 159.99 LE

#### 16. Matcha & Soft Drinks
**Image**: Matcha.jpeg
**Animation**: steam

- Coconut Matcha — 124.99 LE
- Mango Matcha — 124.99 LE
- Strawberry Matcha — 124.99 LE
- Passion Matcha — 124.99 LE
- Matcha Latte — 109.99 LE
- Mineral Water — 19.99 LE
- Pepsi — 34.99 LE
- Seven Up — 34.99 LE
- Redbull Original — 79.99 LE

---

### 🧃 DRINKS SECTION

#### 17. Frappe with Coffee
**Image**: Frappe with coffee.jpeg
**Animation**: ice-fall

- Coffee Frappe - Medium — 99.99 LE
- Coffee Frappe - Large — 109.99 LE
- Mocha Frappe - Medium — 104.99 LE
- Mocha Frappe - Large — 114.99 LE
- White Mocha Frappe - Medium — 104.99 LE
- White Mocha Frappe - Large — 114.99 LE
- Coffee Caramel - Medium — 104.99 LE
- Coffee Caramel - Large — 114.99 LE
- Oreo Cookies - Medium — 124.99 LE
- Oreo Cookies - Large — 134.99 LE

#### 18. Frappe without Coffee
**Image**: Frappe without coffee.jpeg
**Animation**: ice-fall

- Caramel - Medium — 99.99 LE
- Caramel - Large — 109.99 LE
- Chocolate - Medium — 99.99 LE
- Chocolate - Large — 109.99 LE
- Nutella - Medium — 119.99 LE
- Nutella - Large — 139.99 LE
- Lotus - Medium — 119.99 LE
- Lotus - Large — 139.99 LE
- Strawberry - Medium — 99.99 LE
- Strawberry - Large — 109.99 LE
- Vanilla - Medium — 99.99 LE
- Vanilla - Large — 104.99 LE
- Pistachio - Medium — 124.99 LE
- Pistachio - Large — 144.99 LE
- Salted Caramel Frappe - Medium — 109.99 LE
- Salted Caramel Frappe - Large — 119.99 LE
- Bubbles Gum — 129.99 LE

#### 19. Fresh Juice
**Image**: Freash juice.jpeg
**Animation**: bubble
**🎬 Video**: juice-anmation.mp4 (plays when scrolled into view)

- Lemon — 79.99 LE
- Lemon Mint — 79.99 LE
- Orange — 79.99 LE
- Strawberry — 89.99 LE
- Mango — 94.99 LE
- Water Melon — 89.99 LE
- Banana — 84.99 LE

#### 20. Ice Drinks
**Image**: Ice drinks.jpeg
**Animation**: ice-fall

- Ice Latte - Medium — 84.99 LE
- Ice Latte - Large — 94.99 LE
- Ice Americano — 74.99 LE
- Ice Mocha - Medium — 114.99 LE
- Ice Mocha - Large — 124.99 LE
- Ice White Mocha - Medium — 114.99 LE
- Ice White Mocha - Large — 124.99 LE
- Ice Chocolate - Medium — 109.99 LE
- Ice Chocolate - Large — 119.99 LE
- Ice Spanish Latte - Medium — 94.99 LE
- Ice Spanish Latte - Large — 109.99 LE
- Creamy Ice Mocha — 124.99 LE
- Caramel Macchiato — 109.99 LE
- Rafaello Latte — 119.99 LE

#### 21. Milk Shake
**Image**: Milk shake.jpeg
**Animation**: shake

- Chocolate - Medium — 94.99 LE
- Chocolate - Large — 99.99 LE
- Caramel - Medium — 94.99 LE
- Caramel - Large — 99.99 LE
- Lotus - Medium — 119.99 LE
- Lotus - Large — 129.99 LE
- Vanilla - Medium — 94.99 LE
- Vanilla - Large — 99.99 LE
- Pistachio - Medium — 124.99 LE
- Pistachio - Large — 144.99 LE
- Nutella - Medium — 114.99 LE
- Nutella - Large — 129.99 LE
- Strawberry - Medium — 94.99 LE
- Strawberry - Large — 99.99 LE
- Mango - Medium — 94.99 LE
- Mango - Large — 99.99 LE
- Blueberry - Medium — 94.99 LE
- Blueberry - Large — 99.99 LE
- Oreo - Medium — 94.99 LE
- Oreo - Large — 99.99 LE
- Kinder - Medium — 119.99 LE
- Kinder - Large — 129.99 LE

#### 22. Smoothies
**Image**: Smoothies.jpeg
**Animation**: bubble

- Mango - Medium — 94.99 LE
- Mango - Large — 99.99 LE
- Strawberry - Medium — 94.99 LE
- Strawberry - Large — 99.99 LE
- Blueberry - Medium — 94.99 LE
- Blueberry - Large — 99.99 LE
- Passion Fruit - Medium — 94.99 LE
- Passion Fruit - Large — 99.99 LE
- Peach - Medium — 94.99 LE
- Peach - Large — 99.99 LE
- Lemon & Mint - Medium — 94.99 LE
- Lemon & Mint - Large — 99.99 LE

#### 23. Mojito
**Image**: mojito.jpeg
**Animation**: bubble

- Blue Lemon — 99.99 LE
- Pomegranate Mojito — 99.99 LE
- Mint Mojito — 99.99 LE
- Strawberry Mojito — 99.99 LE
- Cherry Cola — 99.99 LE
- Red Bull Mojito — 129.99 LE
- Blueberry Mojito — 99.99 LE
- Blue Hawaii — 99.99 LE
- Coconut Strawberry Mojito — 119.99 LE
- Coconut Pineapple Mojito — 119.99 LE

#### 24. Cocktails
**Image**: Cocktales.jpeg
**Animation**: bubble

- Kiwi Mango — 119.99 LE
- Miami — 99.99 LE
- Mango Passion — 94.99 LE
- Mango Tropical — 94.99 LE

#### 25. Bubbles
**Image**: Bubbels.jpeg
**Animation**: bubble

- Mixedberry Bubbles — 119.99 LE
- Miami Bubbles — 119.99 LE
- Passion Bubbles — 109.99 LE
- Energized Bubbles — 139.99 LE
- Mango Passion Bubbles — 119.99 LE
- Watermelon Freez Bubbles — 114.99 LE

#### 26. Boba
**Image**: Boba.jpeg
**Animation**: bubble

- Boba Spanish Latte — 129.99 LE
- Boba Tea — 84.99 LE
- Boba Strawberry — 109.99 LE
- Boba Raspberry — 109.99 LE
- Boba Golden Bloody — 104.99 LE
- Boba Salted Caramel — 109.99 LE
- Boba Mango Tropical — 109.99 LE
- Blue Sea Boba — 114.99 LE
- Boba Matcha — 129.99 LE

---

## Video Assets

### Intro Video
- **File**: `burger-anmation.mp4`
- **Trigger**: On page load (once)
- **Duration**: Auto (plays until end)
- **Position**: Full screen overlay
- **Autoplay**: Yes
- **Muted**: Yes
- **After**: Fades out, shows menu

### Category Videos
1. **Coffee Animation**
   - **File**: `coffee-anmation.mp4`
   - **Trigger**: When "Coffee Drinks" category scrolls into view (30% threshold)
   - **Plays**: Once per session
   - **Position**: Full screen overlay

2. **Juice Animation**
   - **File**: `juice-anmation.mp4`
   - **Trigger**: When "Fresh Juice" category scrolls into view (30% threshold)
   - **Plays**: Once per session
   - **Position**: Full screen overlay

---

## Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows visual flow
- Enter/Space to toggle accordions

### Screen Readers
- Semantic HTML structure
- Alt text on images (category names)
- ARIA labels where needed

### Contrast Ratios
- Text on backgrounds meets WCAG AA standards
- Copper on dark backgrounds: High contrast
- Muted text: Sufficient for secondary content

---

## Performance Optimizations

### Images
- Format: JPEG for photos
- Lazy loading on scroll
- Responsive images via srcset (if implemented)

### Videos
- Preload: auto
- Compression: Optimized for web
- Fallback: If autoplay fails, timeout to menu

### Animations
- GPU-accelerated properties (transform, opacity)
- Intersection Observer for scroll detection
- Motion reduced respected (system preference)

---

## Technical Implementation

### Framework
- **React** with TypeScript
- **TanStack Router** for routing
- **Framer Motion** for animations
- **Tailwind CSS** for styling

### State Management
- Local component state (useState)
- Refs for DOM access (useRef)
- Effects for observers (useEffect)

### File Structure
```
src/
├── routes/
│   └── menu.tsx (main page)
├── data/
│   └── menuData.ts (all menu items)
├── components/
│   ├── site/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── animations/
│       ├── BurgerIntroVideo.tsx
│       └── CategoryVideo.tsx
└── assets/
    ├── *.jpeg (category images)
    └── *.mp4 (video files)
```

---

## Future Enhancements

### Potential Additions
- Search/filter functionality
- Dietary filters (vegetarian, vegan, etc.)
- Favorites system
- Order online integration
- Multiple language support (Arabic/English toggle)
- Print-friendly menu version

### Analytics Tracking
- Video view completion rates
- Most viewed categories
- Average time on page
- Click-through rates on products

---

## Maintenance Notes

### Updating Menu Items
1. Edit `src/data/menuData.ts`
2. Follow existing format for prices (XX.XX LE)
3. Ensure all items have `name`, `price`, `image`
4. Optional: Add `description` field

### Adding New Categories
1. Add category to `menuCategories` array
2. Provide: `id`, `name`, `animation`, `icon`, `image`, `items[]`
3. Place image in `src/assets/`
4. If video needed, add to CategorySection logic

### Updating Styles
- Modify Tailwind classes in components
- Update color variables in `tailwind.config`
- Test responsive breakpoints on all devices

---

**Last Updated**: January 2025
**Version**: 1.0
**Author**: Griffin Coffee Development Team
