// import { Suspense } from "react";
// import { LoaderOnRefresh } from "../components/commonComponent/loader";
// // ==============================|| LOADABLE - LAZY LOADING ||============================== //
// const Loadable = (Component: any) => (props: any) =>
//   (
//     <Suspense fallback={<LoaderOnRefresh />}>
//       <Component {...props} />
//     </Suspense>
//   );
// export default Loadable;
import { lazy, Suspense } from "react";

const Loadable = (importFunc: any) => {
  const LazyComponent = lazy(() =>
    importFunc().catch((error: any) => {
      console.error("Failed to fetch dynamically imported module", error);
      // Handle the error, e.g., show an error message
      window.location.reload();
      throw error;
    })
  );

  return (props: any) => (
    <Suspense>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
