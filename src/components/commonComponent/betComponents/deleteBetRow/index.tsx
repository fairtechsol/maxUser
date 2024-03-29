import { ReactNode } from "react";
import "./style.scss";

interface Props {
  children?: ReactNode;
  title?: string;
  active?: boolean;
}
const DeleteBetOverlay = ({ title }: Props) => {
  return (
    <>
      {title && (
        <div className="betDeleteOverlay">
          <h5 className="text-uppercase" title={`Bet Deleted  Due To ${title}`}>
            Bet <span> Deleted </span> Due To {title}
          </h5>
        </div>
      )}
    </>
  );
};

export default DeleteBetOverlay;
