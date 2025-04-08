
import type { Config } from "tailwindcss";

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
			fontFamily: {
				'serif': ['Merriweather', 'serif'],
				'sans': ['Open Sans', 'sans-serif'],
				'stay-calm': ['"Stay Calm"', 'sans-serif'],
				'calming': ['Calming', 'serif'],
				'ff-yoga': ['"FF Yoga"', 'serif'],
				'close-eyes': ['"Close Eyes"', 'cursive'],
				'raleway': ['Raleway', 'sans-serif'],
				'tan-mon-cheri': ['"Tan Mon Cheri"', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				mindful: {
					DEFAULT: '#73A580',
					dark: '#5C8467',
					light: '#A6C1AD',
					lighter: '#E8F0EA',
					darker: '#4A6B53',
				},
				// New color palette inspired by modern and engaging design
				mystic: {
					50: '#f0f7ff',
					100: '#e0effe',
					200: '#bae2fd',
					300: '#7dcdfb',
					400: '#38b3f5',
					500: '#0e9be8',
					600: '#037ac5',
					700: '#0562a0',
					800: '#0a5385',
					900: '#0e456e',
					950: '#0a2c4a',
				},
				spice: {
					50: '#fff8eb',
					100: '#ffebc7',
					200: '#ffd588',
					300: '#ffb74d',
					400: '#ff9521',
					500: '#f97707',
					600: '#dd5202',
					700: '#b63907',
					800: '#932b0c',
					900: '#7a250e',
					950: '#461103',
				},
				cloud: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
					950: '#030712',
				}
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
				'float-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'emoji-float': {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-up': 'float-up 0.5s ease-out forwards',
				'emoji-float': 'emoji-float 5s ease-out forwards'
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--foreground)',
						maxWidth: '100%',
						a: {
							color: 'var(--mindful)',
							'&:hover': {
								color: 'var(--mindful-dark)',
							},
						},
						h1: {
							color: 'var(--mindful-dark)',
						},
						h2: {
							color: 'var(--mindful-dark)',
						},
						h3: {
							color: 'var(--mindful)',
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
