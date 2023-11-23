import BackLayComponent from "./backlayComponent";
import "./style.scss";
const MobileOneVOneGame = ({ data }: any) => {
  return (
    <div className="bg-lightGray match-list-container">
      {data?.map((item: any, index: number) => {
        return (
          <div key={index} className="px-3 py-1 m-game-one-v-one">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <b className="title-14">{item?.name}</b>
                <div className="title-12">nov,12 2023</div>
              </div>
              <div></div>
            </div>
            <div className="d-flex w-100">
              <BackLayComponent heading="1" backRate={1.26} layRate={2.38} />
              <BackLayComponent heading="X" backRate={"-"} layRate={"-"} />
              <BackLayComponent heading="2" backRate={1} layRate={2.38} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileOneVOneGame;
