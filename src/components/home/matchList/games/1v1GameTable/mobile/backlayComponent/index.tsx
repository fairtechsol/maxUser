import BackLayBox from "../../../../../../commonComponent/betComponents/backLayBox";

interface BackLayComponentProps {
  heading: string;
  backRate: string | number;
  layRate: string | number;
  active: boolean;
}

const BackLayComponent = ({
  heading,
  backRate,
  layRate,
  active,
}: BackLayComponentProps) => {
  return (
    <div className="d-flex flex-column w-100">
      <div className="text-center f800 title-14">{heading}</div>
      <div className="d-flex w-100 text-center pb-1">
        <BackLayBox bgColor={"blue3"} rate={backRate} active={active}  onClick={() => {}} />
        <BackLayBox bgColor={"red1"} rate={layRate} active={active}  onClick={() => {}} />
      </div>
    </div>
  );
};

export default BackLayComponent;
