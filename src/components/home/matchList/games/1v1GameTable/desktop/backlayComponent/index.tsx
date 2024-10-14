import BackLayBox from "../../../../../../commonComponent/betComponents/backLayBox";

interface BackLayComponentProps {
  backRate: string | number;
  layRate: string | number;
  active: boolean;
  backPercent?: string | number;
  layPercent?: string | number;
}

const BackLayComponent = ({
  backRate,
  layRate,
  active,
  backPercent,
  layPercent,
}: BackLayComponentProps) => {
  return (
    <>
      <div style={{ width: "100%",display:"flex",flexDirection:"row" }} >
        <BackLayBox
          bgColor={"blue3"}
          rate={backRate}
          active={active}
          percent={backPercent}
          onClick={() => {}}
        />
        <BackLayBox
          bgColor={"red1"}
          rate={layRate}
          active={active}
          percent={layPercent}
          onClick={() => {}}
        />
      </div>
      {/* <td style={{ width: "5%" }}>
        <BackLayBox
          bgColor={"red1"}
          rate={layRate}
          active={active}
          percent={layPercent}
          onClick={() => {}}
        />
      </td> */}
    </>
  );
};

export default BackLayComponent;
