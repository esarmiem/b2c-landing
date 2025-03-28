# TravelKit B2C Platform

A modern web application for travel insurance and assistance services built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- Travel assistance quotation and purchase
- Multi-language support (English/Spanish)
- Real-time currency conversion (TRM)
- Responsive design
- International communication services (coming soon)
- Secure payment integration with ePayco

## 🛠 Tech Stack

- **Frontend Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Internationalization:** i18next
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Code Quality:** Biome
- **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd b2c
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the necessary environment variables (see `.env.production` for reference)

4. Start the development server:
```bash
npm run dev
```

## 📦 Project Structure
```
b2c/
├── src/
│   ├── TravelCore/       # Core components and features
│   ├── TravelFeatures/   # Feature-specific components
│   ├── components/       # Shared components
│   ├── config/           # Configuration files
│   ├── lib/              # Utility functions
│   └── Assets/           # Static assets
├── public/
│   └── locales/          # Translation files
```

## 🌍 Internationalization
The application supports multiple languages through i18next. Translation files are located in:

- `/public/locales/en/` - English translations
- `/public/locales/es/` - Spanish translations

## 🔧 Configuration
- Tailwind: Customized theme configuration in `tailwind.config.js`
- Vite: Development and build configuration in `vite.config.ts`
- TypeScript: Configuration in `tsconfig.json`
- Code Formatting: Biome configuration in `biome.json`

## 🔐 Environment Variables
Key environment variables required:

- `VITE_REACT_APP_API_URL`
- `VITE_REACT_APP_SERVICE_AUTHENTICATION`
- `VITE_REACT_APP_API_URL_ISL`
- `VITE_REACT_APP_API_URL_EPAYCO_IP`
- `VITE_REACT_APP_API_URL_EPAYCO_PAYMENT`

See `.env.production` for a complete list of required variables.

## 🛣 API Integration
The application integrates with multiple APIs:

- TravelKit API for core services
- ISL API for travel assistance
- ePayco for payment processing

## 📱 Responsive Design
The application is fully responsive and optimized for:

- Desktop devices
- Tablets
- Mobile devices

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is proprietary software. All rights reserved.

## 📞 Support
For support and questions, please contact the development team.