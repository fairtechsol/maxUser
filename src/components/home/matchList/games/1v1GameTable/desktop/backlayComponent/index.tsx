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
      <td>
        <BackLayBox bgColor={"blue3"} rate={backRate} active={active} />
      </td>
      <td>
        <BackLayBox bgColor={"red1"} rate={layRate} active={active} />
      </td>
    </>
  );
};

export default BackLayComponent;
