/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_API_URL: string;
    readonly VITE_REACT_APP_SERVICE_AUTHENTICATION: string;
    readonly VITE_REACT_APP_SERVICE_CONTRIES: string;
    readonly VITE_REACT_APP_SERVICE_ARRIVALS: string;
    readonly VITE_REACT_APP_SERVICE_QUESTIONS: string;
    readonly VITE_REACT_APP_SERVICE_MEDICAL_CONDITIONS: string;
    readonly VITE_REACT_APP_SERVICE_DOCUMENT_TYPE: string;
    readonly VITE_REACT_APP_SERVICE_PRODUCTS: string;
    readonly VITE_REACT_APP_SERVICE_PARAMETERS: string;
    readonly VITE_REACT_APP_SERVICE_GET_CITIES_BY_COUNTRY: string;
    readonly VITE_REACT_APP_SERVICE_GET_ORDER_PRICE_EDAD: string;
    readonly VITE_REACT_APP_SERVICE_CHECK_PREORDER_ISL: string;
    readonly VITE_REACT_APP_USER_NAME: string;
    readonly VITE_REACT_APP_USER_PASSWORD: string;
    readonly VITE_ISL_USER_NAME: string;
    readonly VITE_ISL_PASSWORD: string;
    readonly VITE_ISL_APP_SERVICE_UPGRADES: string;
    readonly VITE_REACT_APP_API_URL_ISL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }