/**
 * Dark Mode Token System
 * Extracted directly from homepage pattern in pages/index.js
 * Use these token pairs (light + dark) for consistent dark mode across all pages
 */

export const darkTokens = {
  // BACKGROUND TOKENS
  backgrounds: {
    // Page/section background - light (#F8FAFC)
    pageLight: 'bg-slate-50',
    pageDark: 'dark:bg-gray-900',
    
    // White background (cards, panels, inputs)
    whiteBg: 'bg-white',
    whiteCardDark: 'dark:bg-gray-800',
    
    // Alternate section background
    altSectionLight: 'bg-white',
    altSectionDark: 'dark:bg-gray-800',
  },

  // TEXT TOKENS
  text: {
    // Primary text (headings, titles)
    titleLight: 'text-slate-900',
    titleDark: 'dark:text-white',
    
    // Body text (paragraphs)
    bodyLight: 'text-gray-900',
    bodyDark: 'dark:text-white',
    
    // Secondary/muted text (subtitles, descriptions)
    mutedLight: 'text-slate-500',
    mutedDark: 'dark:text-gray-300',
    
    // Light gray text (dates, helper text)
    lightGrayLight: 'text-slate-400',
    lightGrayDark: 'dark:text-gray-500',
  },

  // BORDER & SEPARATOR TOKENS
  borders: {
    // Card borders
    borderLight: 'border-slate-200',
    borderDark: 'dark:border-gray-700',
    
    // Card separator variant
    borderAltLight: 'border-slate-100',
    borderAltDark: 'dark:border-gray-700',
  },

  // BADGE & LABEL TOKENS
  badges: {
    // Badge background (teal brand)
    badgeBgLight: 'bg-[#008C95]/10',
    badgeBgDark: 'dark:bg-[#008C95]/20',
    
    // Badge text (teal brand)
    badgeTextLight: 'text-[#008C95]',
    badgeTextDark: 'dark:text-[#10B981]',
  },

  // BUTTON & LINK TOKENS
  buttons: {
    // Primary button (teal brand)
    btnPrimaryLight: 'bg-[#008C95] hover:bg-[#006B73]',
    btnPrimaryDark: 'dark:bg-[#10B981] dark:hover:bg-[#059669]',
    
    // Link (teal brand)
    linkLight: 'text-[#008C95] hover:text-[#006B73]',
    linkDark: 'dark:text-[#10B981] dark:hover:text-[#059669]',
    
    // Link hover variant (for group-hover)
    linkGroupHoverDark: 'dark:group-hover:text-[#10B981]',
  },

  // INPUT & FORM TOKENS
  form: {
    // Input background
    inputBgLight: 'bg-white/10',
    inputBgDark: 'dark:bg-white/10',
    
    // Input border
    inputBorderLight: 'border-white/30',
    inputBorderDark: 'dark:border-white/20',
    
    // Input text (on dark overlay - hero)
    inputTextLight: 'text-white',
    inputTextDark: 'dark:text-white',
    
    // Input placeholder
    placeholderLight: 'placeholder-white/50',
    placeholderDark: 'dark:placeholder-white/40',
    
    // Input focus
    inputFocusLight: 'focus:border-white/60',
    inputFocusDark: 'dark:focus:border-white/40',
  },

  // OVERLAY & MODAL TOKENS
  overlay: {
    // Dark overlay
    overlayBg: 'bg-black/70',
    
    // Modal/card in overlay
    modalBgLight: 'bg-white',
    modalBgDark: 'dark:bg-gray-800',
  },

  // UTILITIES
  combinedClasses: {
    // Full pattern: Section with background
    section: 'py-16 md:py-24 bg-slate-50 dark:bg-gray-900',
    whiteSection: 'py-16 md:py-24 bg-white dark:bg-gray-800',
    
    // Full pattern: Card
    card: 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl',
    
    // Full pattern: Title
    title: 'text-slate-900 dark:text-white',
    
    // Full pattern: Text body
    body: 'text-gray-600 dark:text-gray-300',
    
    // Full pattern: Muted text
    muted: 'text-slate-500 dark:text-gray-300',
    
    // Full pattern: Badge
    badge: 'bg-[#008C95]/10 text-[#008C95] dark:bg-[#008C95]/20 dark:text-[#10B981]',
    
    // Full pattern: Primary button
    buttonPrimary: 'bg-[#008C95] hover:bg-[#006B73] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white',
    
    // Full pattern: Link
    link: 'text-[#008C95] dark:text-[#10B981] hover:text-[#006B73] dark:hover:text-[#059669]',
  },
} as const;

/**
 * Usage Example:
 * 
 * Instead of:
 *   <div className="bg-white text-gray-900">
 * 
 * Use:
 *   <div className={`${darkTokens.backgrounds.whiteBg} ${darkTokens.backgrounds.whiteCardDark} ${darkTokens.text.bodyLight} ${darkTokens.text.bodyDark}`}>
 * 
 * Or even simpler, use the combined classes:
 *   <div className={darkTokens.combinedClasses.card}>
 *   <h1 className={darkTokens.combinedClasses.title}>Title</h1>
 *   <p className={darkTokens.combinedClasses.body}>Body text</p>
 */

export type DarkTokens = typeof darkTokens;
