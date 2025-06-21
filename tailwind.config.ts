
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
                extend: {
                        spacing: {
                                'sidebar-mini': '4rem',
                                'sidebar-full': '18rem',
                        },
                        width: {
                                'sidebar-mini': '4rem',
                                'sidebar-full': '18rem',
                                'spinner-xs': '1rem',
                                'spinner-sm': '1.5rem',
                                'spinner-md': '2rem',
                                'spinner-lg': '3rem',
                                'spinner-xl': '4rem'
                        },
                        transitionProperty: {
                                sidebar: 'margin,width'
                        },
                        height: {
                                'spinner-xs': '1rem',
                                'spinner-sm': '1.5rem',
                                'spinner-md': '2rem',
                                'spinner-lg': '3rem',
                                'spinner-xl': '4rem'
                        },
                        fontFamily: {
                                sans: ["Inter", "ui-sans-serif", "system-ui"],
                        },
                        colors: {
                            // Premium Brand Colors
                            brand: {
                                        primary: "#1D4ED8",
                                        "primary-dark": "#2563EB",
                                        secondary: "#9333EA",
                                        accent: "#10B981",
                                        background: {
                                                light: "#F9FAFB",
                                                dark: "#111827",
                                        },
                                        text: {
                                                light: "#1F2937",
                                                dark: "#F9FAFB",
                                        },
                                },
                                // Premium Color Palette
                                premium: {
                                        blue: {
                                                50: "#eff6ff",
                                                500: "#3b82f6",
                                                600: "#2563eb",
                                                900: "#1e3a8a"
                                        },
                                        emerald: {
                                                50: "#ecfdf5",
                                                500: "#10b981",
                                                600: "#059669",
                                                900: "#064e3b"
                                        },
                                        purple: {
                                                50: "#faf5ff",
                                                500: "#a855f7",
                                                600: "#9333ea",
                                                900: "#581c87"
                                        },
                                        orange: {
                                                50: "#fff7ed",
                                                500: "#f97316",
                                                600: "#ea580c",
                                                900: "#9a3412"
                                        }
                                },
                                border: 'hsl(var(--border))',
                                input: 'hsl(var(--input))',
                                ring: 'hsl(var(--ring))',
                                background: 'hsl(var(--background))',
                                'background-desktop': 'hsl(var(--background-color-desktop))',
                                foreground: 'hsl(var(--foreground))',
                                text: 'hsl(var(--text-color))',
                                primary: {
                                        DEFAULT: 'hsl(var(--primary))',
                                        foreground: 'hsl(var(--primary-foreground))'
                                },
                                secondary: {
                                        DEFAULT: 'hsl(var(--secondary))',
                                        foreground: 'hsl(var(--secondary-foreground))'
                                },
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
                                sidebar: {
                                        DEFAULT: 'hsl(var(--sidebar-background))',
                                        foreground: 'hsl(var(--sidebar-foreground))',
                                        primary: 'hsl(var(--sidebar-primary))',
                                        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                                        accent: 'hsl(var(--sidebar-accent))',
                                        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                                        border: 'hsl(var(--sidebar-border))',
                                        ring: 'hsl(var(--sidebar-ring))'
                                },
                                'color-bg': 'hsl(var(--color-bg))',
                                'color-surface': 'hsl(var(--color-surface))',
                                'color-text': 'hsl(var(--color-text))',
                                'color-muted': 'hsl(var(--color-muted))',
                                'color-primary': 'hsl(var(--color-primary))',
                                'color-accent': 'hsl(var(--color-accent))'
                        },
                        backgroundImage: {
                                'gradient-primary': 'linear-gradient(to right, #1D4ED8, #9333EA)',
                                'gradient-premium-light': 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 25%, #ddd6fe 75%, #fef3c7 100%)',
                                'gradient-premium-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 75%, #422006 100%)',
                                'gradient-chart-blue': 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                                'gradient-chart-emerald': 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                                'gradient-chart-purple': 'linear-gradient(180deg, #a855f7 0%, #9333ea 100%)',
                                'gradient-chart-orange': 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)',
                                'header-gradient': 'var(--header-gradient)',
                                'sidebar-gradient': 'var(--sidebar-gradient)'
                        },
                        borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
                        keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                                'fade-in': {
                                        '0%': { opacity: '0', transform: 'translateY(10px)' },
                                        '100%': { opacity: '1', transform: 'translateY(0)' }
                                },
                                'slide-up': {
                                        '0%': { opacity: '0', transform: 'translateY(20px)' },
                                        '100%': { opacity: '1', transform: 'translateY(0)' }
                                },
                                'scale-in': {
                                        '0%': { opacity: '0', transform: 'scale(0.95)' },
                                        '100%': { opacity: '1', transform: 'scale(1)' }
                                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                                'fade-in': 'fade-in 0.5s ease-out',
                                'slide-up': 'slide-up 0.6s ease-out',
                                'scale-in': 'scale-in 0.4s ease-out'
			}
		}
	},
        plugins: [animate],
} satisfies Config;
