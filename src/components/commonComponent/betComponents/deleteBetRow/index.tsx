import { ReactNode } from "react";
import "./style.scss";
import isMobile from "../../../../utils/screenDimension";

interface Props {
  children?: ReactNode;
  title?: string;
  active?: boolean;
}
const DeleteBetOverlay = ({ title }: Props) => {
  return (
    <>
      {title && (
        <div className={isMobile ? "betDeleteOverlay-m" : "betDeleteOverlay"}>
          <h5 className="text-uppercase" title={`Bet Deleted  Due To ${title}`}>
            Bet <span> Deleted </span> Due To {title}
          </h5>
        </div>
      )}
    </>
  );
};

export default DeleteBetOverlay;
