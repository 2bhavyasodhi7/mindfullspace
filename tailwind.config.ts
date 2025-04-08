
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
				'sans': ['Inter', 'sans-serif'],
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
				// Updated color scheme inspired by Headspace
				mindful: {
					DEFAULT: '#F36B08', // Orange primary
					dark: '#D95A00',    // Darker orange
					light: '#FF8A3D',   // Lighter orange
					lighter: '#FFF0E6', // Very light orange
					darker: '#B84C00',  // Very dark orange
				},
				// Adding Headspace yellow as a secondary color
				mindful2: {
					DEFAULT: '#FACA0F', // Yellow
					dark: '#E0B400',    // Darker yellow
					light: '#FFD83D',   // Lighter yellow
					lighter: '#FFF7E0', // Very light yellow
					darker: '#C89E00',  // Very dark yellow
				},
				// Adding Headspace blue as a tertiary color
				mindful3: {
					DEFAULT: '#304B61', // Blue
					dark: '#1E3142',    // Darker blue
					light: '#4A6683',   // Lighter blue
					lighter: '#E5EBF1', // Very light blue
					darker: '#0F1A23',  // Very dark blue
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
