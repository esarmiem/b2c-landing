import { type ReactElement, lazy } from 'react'
import { type RouteObject, useRoutes } from 'react-router-dom'
//import SuspenseLoader from '../Components/Epic/SuspenseLoader';
import Layout from '../Styles/Layout'

/*const Loader = <P extends object>(Component: React.LazyExoticComponent<ComponentType<P>>) => {
    return (props: P) => (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );
};*/

const HomePage = lazy(() => import('../../TravelFeatures/Home/pages/homePage.tsx'))
const TripQuotePage = lazy(() => import('../../TravelFeatures/TripQuote/pages/TripQuotePage.tsx'))
const CommsQuotePage = lazy(() => import('../../TravelFeatures/CommsQuote/pages/commsQuotePage.tsx'))
const InvoicePage = lazy(() => import('../../TravelFeatures/Invoice/pages/invoicePage.tsx'))
const BillingResultPage = lazy(() => import('../../TravelFeatures/Invoice/pages/billingResultPage.tsx'))
const TravelerPage = lazy(() => import('../../TravelFeatures/Traveler/pages/TravelerPage.tsx'))
const NotFoundPage = lazy(() => import('../../TravelFeatures/Home/pages/notFoundPage.tsx'))

export default function Router(): ReactElement | null {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    },
    {
      path: 'quote',
      element: <Layout />,
      children: [
        {
          path: 'travel',
          element: <TripQuotePage />
        },
        {
          path: 'comms',
          element: <CommsQuotePage />
        }
      ]
    },
    {
      path: 'traveler',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <TravelerPage />
        }
      ]
    },
    {
      path: 'invoice',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <InvoicePage />
        },

        {
          path: 'billingResult',
          element: <BillingResultPage />
        }
      ]
    }
  ]

  return useRoutes(routes)
}
