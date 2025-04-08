/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./useHomeState.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			dark: '#d97b1c',
			foreground: 'hsl(var(--primary-foreground))'
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
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
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
		borderRadius: {
		  hero: '60px',
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		maxWidth: {
		  container: '1200px'
		},
		boxShadow: {
		  form: '0 4px 20px rgba(0, 0, 0, 0.1)'
		},
		// Agregar la fuente Fira Sans
		fontFamily: {
		  sans: ['Fira Sans', 'sans-serif'], // Usar Fira Sans como fuente predeterminada
		},
		animation: {
			fadeIn: 'fadeIn 0.5s ease-out forwards',
			subtleBounce: 'subtleBounce 1.2s ease-in-out infinite',
		  },
		  keyframes: {
			fadeIn: {
			  '0%': { opacity: '0', transform: 'translateY(20px)' },
			  '100%': { opacity: '1', transform: 'translateY(0)' },
			},
			subtleBounce: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-5px)' },
			  }
		  },
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }