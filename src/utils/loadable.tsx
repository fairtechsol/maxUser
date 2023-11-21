import { Suspense } from "react";
// ==============================|| LOADABLE - LAZY LOADING ||============================== //
const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<div>Loading here...</div>}>
      <Component {...props} />
    </Suspense>
  );
export default Loadable;