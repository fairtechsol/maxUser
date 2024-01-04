import { Suspense } from "react";
import { LoaderOnRefresh } from "../components/commonComponent/loader";
// ==============================|| LOADABLE - LAZY LOADING ||============================== //
const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoaderOnRefresh />}>
      <Component {...props} />
    </Suspense>
  );
export default Loadable;
