import { ReactNode } from "react";
import { MasterProvider } from "./Masters.tsx";
import { SessionProvider } from "./Session.tsx";
import { DataProvider } from "@/TravelCore/ContextData/Data.tsx";
import { OrderProvider } from "@/TravelCore/ContextData/Order.tsx";

/**
 * ProviderProps
 *
 * Spanish:
 * Define las propiedades para el componente Providers, que requiere un ReactNode como children.
 *
 * English:
 * Defines the props for the Providers component, which requires a ReactNode as children.
 */
interface ProviderProps {
  children: ReactNode;
}

/**
 * Array de proveedores de contexto.
 *
 * Spanish:
 * Este array contiene todos los componentes proveedores que se utilizarán para envolver la aplicación,
 * permitiendo así el acceso a distintos contextos globales.
 *
 * English:
 * This array contains all the provider components that will be used to wrap the application,
 * thereby allowing access to different global contexts.
 */
const providers = [
  MasterProvider,
  SessionProvider,
  DataProvider,
  OrderProvider,
];
/**
 * Providers
 *
 * Spanish:
 * Componente que compone múltiples proveedores de contexto en uno solo.
 * Utiliza la función reduce para envolver los elementos hijos con cada uno de los proveedores listados en el array `providers`,
 * lo que permite que todos los contextos sean accesibles en la aplicación.
 *
 * English:
 * Component that composes multiple context providers into a single component.
 * It uses the reduce function to wrap the children with each provider listed in the `providers` array,
 * ensuring that all contexts are accessible throughout the application.
 *
 * @param {ProviderProps} props - Propiedades del componente que incluyen los elementos hijos.
 *                                / Component properties including the child elements.
 * @returns {JSX.Element} Un elemento JSX que envuelve la aplicación con los proveedores de contexto.
 *                        / A JSX element that wraps the application with context providers.
 */
export const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      {providers.reduce(
        (AccumulatedProviders, CurrentProvider) => (
          <CurrentProvider>{AccumulatedProviders}</CurrentProvider>
        ),
        children,
      )}
    </>
  );
};
