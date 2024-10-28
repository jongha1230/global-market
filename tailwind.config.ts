import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		container: {
  			center: 'true',
  			padding: '2rem',
  			screens: {
  				'2xl': '1400px'
  			}
  		},
  		extend: {
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
  				}
  			},
  			animation: {
  				'accordion-down': 'accordion-down 0.2s ease-out',
  				'accordion-up': 'accordion-up 0.2s ease-out'
  			}
  		},
  		colors: {
  			white: {
  				'3': 'rgba(255, 255, 255, 0.03)',
  				'5': 'rgba(255, 255, 255, 0.05)',
  				'10': 'rgba(255, 255, 255, 0.1)',
  				'20': 'rgba(255, 255, 255, 0.2)',
  				'30': 'rgba(255, 255, 255, 0.3)',
  				'40': 'rgba(255, 255, 255, 0.4)',
  				'50': 'rgba(255, 255, 255, 0.5)',
  				'60': 'rgba(255, 255, 255, 0.6)',
  				'70': 'rgba(255, 255, 255, 0.7)',
  				'80': 'rgba(255, 255, 255, 0.8)',
  				'90': 'rgba(255, 255, 255, 0.9)',
  				'100': '#ffffff'
  			},
  			black: {
  				'3': 'rgba(0, 0, 0, 0.03)',
  				'5': 'rgba(0, 0, 0, 0.05)',
  				'10': 'rgba(0, 0, 0, 0.1)',
  				'20': 'rgba(0, 0, 0, 0.2)',
  				'30': 'rgba(0, 0, 0, 0.3)',
  				'40': 'rgba(0, 0, 0, 0.4)',
  				'50': 'rgba(0, 0, 0, 0.5)',
  				'60': 'rgba(0, 0, 0, 0.6)',
  				'70': 'rgba(0, 0, 0, 0.7)',
  				'80': 'rgba(0, 0, 0, 0.8)',
  				'90': 'rgba(0, 0, 0, 0.9)',
  				'100': '#000000'
  			},
  			primary: {
  				'3': 'rgba(0, 0, 128, 0.03)',
  				'5': 'rgba(0, 0, 128, 0.05)',
  				'10': 'rgba(0, 0, 128, 0.1)',
  				'20': 'rgba(0, 0, 128, 0.2)',
  				'30': 'rgba(0, 0, 128, 0.3)',
  				'40': 'rgba(0, 0, 128, 0.4)',
  				'50': 'rgba(0, 0, 128, 0.5)',
  				'60': 'rgba(0, 0, 128, 0.6)',
  				'70': 'rgba(0, 0, 128, 0.7)',
  				'80': 'rgba(0, 0, 128, 0.8)',
  				'90': 'rgba(0, 0, 128, 0.9)',
  				'100': '#000080',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				'3': 'rgba(65, 105, 225, 0.03)',
  				'5': 'rgba(65, 105, 225, 0.05)',
  				'10': 'rgba(65, 105, 225, 0.1)',
  				'20': 'rgba(65, 105, 225, 0.2)',
  				'30': 'rgba(65, 105, 225, 0.3)',
  				'40': 'rgba(65, 105, 225, 0.4)',
  				'50': 'rgba(65, 105, 225, 0.5)',
  				'60': 'rgba(65, 105, 225, 0.6)',
  				'70': 'rgba(65, 105, 225, 0.7)',
  				'80': 'rgba(65, 105, 225, 0.8)',
  				'90': 'rgba(65, 105, 225, 0.9)',
  				'100': '#4169E1',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			secondary: {
  				'3': 'rgba(0, 100, 0, 0.03)',
  				'5': 'rgba(0, 100, 0, 0.05)',
  				'10': 'rgba(0, 100, 0, 0.1)',
  				'20': 'rgba(0, 100, 0, 0.2)',
  				'30': 'rgba(0, 100, 0, 0.3)',
  				'40': 'rgba(0, 100, 0, 0.4)',
  				'50': 'rgba(0, 100, 0, 0.5)',
  				'60': 'rgba(0, 100, 0, 0.6)',
  				'70': 'rgba(0, 100, 0, 0.7)',
  				'80': 'rgba(0, 100, 0, 0.8)',
  				'90': 'rgba(0, 100, 0, 0.9)',
  				'100': '#006400',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			danger: {
  				'3': 'rgba(128, 0, 32, 0.03)',
  				'5': 'rgba(128, 0, 32, 0.05)',
  				'10': 'rgba(128, 0, 32, 0.1)',
  				'20': 'rgba(128, 0, 32, 0.2)',
  				'30': 'rgba(128, 0, 32, 0.3)',
  				'40': 'rgba(128, 0, 32, 0.4)',
  				'50': 'rgba(128, 0, 32, 0.5)',
  				'60': 'rgba(128, 0, 32, 0.6)',
  				'70': 'rgba(128, 0, 32, 0.7)',
  				'80': 'rgba(128, 0, 32, 0.8)',
  				'90': 'rgba(128, 0, 32, 0.9)',
  				'100': '#800020'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'8-regular': ["8px", { fontWeight: "400" }],
  			'8-medium': ["8px", { fontWeight: "500" }],
  			'8-semibold': ["8px", { fontWeight: "600" }],
  			'12-regular': ["12px", { fontWeight: "400" }],
  			'12-medium': ["12px", { fontWeight: "500" }],
  			'12-semibold': ["12px", { fontWeight: "600" }],
  			'16-regular': ["16px", { fontWeight: "400" }],
  			'16-medium': ["16px", { fontWeight: "500" }],
  			'16-semibold': ["16px", { fontWeight: "600" }],
  			'24-regular': ["24px", { fontWeight: "400" }],
  			'24-medium': ["24px", { fontWeight: "500" }],
  			'24-semibold': ["24px", { fontWeight: "600" }],
  			'32-regular': ["32px", { fontWeight: "400" }],
  			'32-medium': ["32px", { fontWeight: "500" }],
  			'32-semibold': ["32px", { fontWeight: "600" }],
  			'48-regular': ["48px", { fontWeight: "400" }],
  			'48-medium': ["48px", { fontWeight: "500" }],
  			'48-semibold': ["48px", { fontWeight: "600" }],
  			'60-regular': ["60px", { fontWeight: "400" }],
  			'60-medium': ["60px", { fontWeight: "500" }],
  			'60-semibold': ["60px", { fontWeight: "600" }]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	keyframes: {
  		slideDownFadeIn: {
  			'0%': {
  				opacity: '0',
  				transform: 'translateY(-10px)'
  			},
  			'100%': {
  				opacity: '1',
  				transform: 'translateY(0)'
  			}
  		},
  		slideUpFadeOut: {
  			'0%': {
  				opacity: '1',
  				transform: 'translateY(0)'
  			},
  			'100%': {
  				opacity: '0',
  				transform: 'translateY(-10px)'
  			}
  		}
  	},
  	animation: {
  		slideDownFadeIn: 'slideDownFadeIn 0.3s ease-out forwards',
  		slideUpFadeOut: 'slideUpFadeOut 0.3s ease-in forwards'
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
