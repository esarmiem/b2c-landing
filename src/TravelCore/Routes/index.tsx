import { lazy, ReactElement } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
//import SuspenseLoader from '../Components/Epic/SuspenseLoader';
import Layout from '../Styles/Layout';

/*const Loader = <P extends object>(Component: React.LazyExoticComponent<ComponentType<P>>) => {
    return (props: P) => (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );
};*/

const HomePage = lazy(() => import('../../TravelFeatures/Home/pages/homePage.tsx'));
const TripQuotePage = lazy(() => import('../../TravelFeatures/TripQuote/pages/tripQuotePage.tsx'));
const CommsQuotePage = lazy(() => import('../../TravelFeatures/CommsQuote/pages/commsQuotePage.tsx'));
const InvoicePage = lazy(() => import('../../TravelFeatures/Invoice/pages/invoicePage.tsx'));

export default function Router(): ReactElement | null {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                }
            ],
        },
        {
            path: "quote",
            element: <Layout />,
            children: [
                {
                    path: "travel",
                    element: <TripQuotePage />,
                },
                {
                    path: "comms",
                    element: <CommsQuotePage />,
                },
            ],
        },
        {
            path: "invoice",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <InvoicePage />,
                },
                {
                    path: "billing",
                    element: <InvoicePage />,
                },
            ],
        },
    ];

    return useRoutes(routes);
}
