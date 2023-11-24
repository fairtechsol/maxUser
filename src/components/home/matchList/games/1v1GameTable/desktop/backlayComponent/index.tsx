import BackLayBox from "../../../../../../commonComponent/betComponents/backLayBox";

interface BackLayComponentProps {
  backRate: string | number;
  layRate: string | number;
}

const BackLayComponent = ({ backRate, layRate }: BackLayComponentProps) => {
  return (
    <>
      <td>
        <BackLayBox bgColor={"blue3"} rate={backRate} />
      </td>
      <td>
        <BackLayBox bgColor={"red1"} rate={layRate} />
      </td>
    </>
  );
};

export default BackLayComponent;
