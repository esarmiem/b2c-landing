import React, { lazy, Suspense } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import Layout from '../Styles/Layout';
import SuspenseLoader from '../Components/Epic/SuspenseLoader';

const ProductsPage = lazy(() => import('../../TravelFeatures/Home/pages/productsPage.tsx'));
const HomeViewPage = lazy(() => import('../../TravelFeatures/Home/pages/homeFlowPage.tsx'));
const TripQuotePage = lazy(() => import('../../TravelFeatures/TripQuote/pages/tripQuotePage.tsx'));
const CommsQuotePage = lazy(() => import('../../TravelFeatures/CommsQuote/pages/commsQuotePage.tsx'));
const InvoicePage = lazy(() => import('../../TravelFeatures/Invoice/pages/invoicePage.tsx'));

export default function Router(): React.ReactElement | null {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <ProductsPage />
                        </Suspense>
                    ),
                },
                {
                    path: "products",
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <ProductsPage />
                        </Suspense>
                    ),
                },
                {
                    path: "home",
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <HomeViewPage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "quote",
            element: <Layout />,
            children: [
                {
                    path: "travel",
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <TripQuotePage />
                        </Suspense>
                    ),
                },
                {
                    path: "comms",
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <CommsQuotePage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "invoice",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <InvoicePage />
                        </Suspense>
                    ),
                },
                {
                    path: "billing",
                    element: (
                        <Suspense fallback={<SuspenseLoader />}>
                            <InvoicePage />
                        </Suspense>
                    ),
                },
            ],
        },
    ];

    return useRoutes(routes);
}

// import React, { lazy } from 'react';
// import { useRoutes, RouteObject } from 'react-router-dom';
// //import SuspenseLoader from '../Components/Epic/SuspenseLoader';
// import Layout from '../Styles/Layout';
//
// /*const Loader = <P extends object>(Component: React.LazyExoticComponent<ComponentType<P>>) => {
//     return (props: P) => (
//         <Suspense fallback={<SuspenseLoader />}>
//             <Component {...props} />
//         </Suspense>
//     );
// };*/
//
// const ProductsPage = lazy(() => import('../../TravelFeatures/Home/pages/productsPage.tsx'));
// const HomeViewPage = lazy(() => import('../../TravelFeatures/Home/pages/homeFlowPage.tsx'));
// const TripQuotePage = lazy(() => import('../../TravelFeatures/TripQuote/pages/tripQuotePage.tsx'));
// const CommsQuotePage = lazy(() => import('../../TravelFeatures/CommsQuote/pages/commsQuotePage.tsx'));
// const InvoicePage = lazy(() => import('../../TravelFeatures/Invoice/pages/invoicePage.tsx'));
//
// export default function Router(): React.ReactElement | null {
//     const routes: RouteObject[] = [
//         {
//             path: "/",
//             element: <Layout />,
//             children: [
//                 {
//                     index: true,
//                     element: <ProductsPage />,
//                 },
//                 {
//                     path: "products",
//                     element: <ProductsPage />,
//                 },
//                 {
//                     path: "home",
//                     element: <HomeViewPage />,
//                 },
//             ],
//         },
//         {
//             path: "quote",
//             element: <Layout />,
//             children: [
//                 {
//                     path: "travel",
//                     element: <TripQuotePage />,
//                 },
//                 {
//                     path: "comms",
//                     element: <CommsQuotePage />,
//                 },
//             ],
//         },
//         {
//             path: "invoice",
//             element: <Layout />,
//             children: [
//                 {
//                     index: true,
//                     element: <InvoicePage />,
//                 },
//                 {
//                     path: "billing",
//                     element: <InvoicePage />,
//                 },
//             ],
//         },
//     ];
//
//     return useRoutes(routes);
// }
