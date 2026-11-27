import React from "react";

// Icônes en trait, reprises du design (couleur = currentColor).
type IconProps = { size?: number; strokeWidth?: number; className?: string };

const Svg: React.FC<IconProps & { children: React.ReactNode; fill?: string }> = ({
  size = 18,
  strokeWidth = 2.2,
  className,
  fill = "none",
  children,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={fill === "none" ? "currentColor" : "none"}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

export const ArrowUpRight: React.FC<IconProps> = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const ArrowLeft: React.FC<IconProps> = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);

export const MailIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="4" />
    <path d="m22 7-10 6L2 7" />
  </Svg>
);

export const MicIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
  </Svg>
);

export const MusicIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const PinIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 22s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const InstagramIcon: React.FC<IconProps> = (p) => (
  <Svg strokeWidth={2} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </Svg>
);

export const FacebookIcon: React.FC<IconProps> = (p) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />
  </Svg>
);

export const PlayIcon: React.FC<IconProps> = (p) => (
  <Svg fill="currentColor" {...p}>
    <path d="M7 4v16l13-8z" />
  </Svg>
);

export const PauseIcon: React.FC<IconProps> = (p) => (
  <Svg fill="currentColor" {...p}>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </Svg>
);

export const StarIcon: React.FC<IconProps> = (p) => (
  <Svg fill="currentColor" {...p}>
    <path d="m12 2 3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z" />
  </Svg>
);

export const MenuIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h10" />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const SwipeIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
