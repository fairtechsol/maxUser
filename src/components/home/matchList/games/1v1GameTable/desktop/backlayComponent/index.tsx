import BackLayBox from "../../../../../../commonComponent/betComponents/backLayBox";

interface BackLayComponentProps {
  backRate: string | number;
  layRate: string | number;
  active: boolean;
}

const BackLayComponent = ({
  backRate,
  layRate,
  active,
}: BackLayComponentProps) => {
  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BackLayBox bgColor="blue3" rate={backRate} active={active} />
        <BackLayBox bgColor="red1" rate={layRate} active={active} />
      </div>
    </>
  );
};

export default BackLayComponent;
