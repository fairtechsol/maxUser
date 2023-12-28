import BackLayBox from "../../../../../../commonComponent/betComponents/backLayBox";

interface BackLayComponentProps {
  heading: string;
  backRate: string | number;
  layRate: string | number;
}

const BackLayComponent = ({
  heading,
  backRate,
  layRate,
}: BackLayComponentProps) => {
  return (
    <div className="d-flex flex-column w-100">
      <div className="text-center f600 title-12">{heading}22</div>
      <div className="d-flex w-100">
        <BackLayBox bgColor={"blue3"} rate={backRate} />
        <BackLayBox bgColor={"red1"} rate={layRate} />
      </div>
    </div>
  );
};

export default BackLayComponent;
