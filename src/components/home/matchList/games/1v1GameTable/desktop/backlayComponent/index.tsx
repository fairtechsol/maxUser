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
      <td style={{width:"5%"}}>
        <BackLayBox
          bgColor={"blue3"}
          rate={backRate}
          active={active}
          percent={backPercent}
        />
      </td>
      <td style={{width:"5%"}}>
        <BackLayBox
          bgColor={"red1"}
          rate={layRate}
          active={active}
          percent={layPercent}
        />
      </td>
    </>
  );
};

export default BackLayComponent;
