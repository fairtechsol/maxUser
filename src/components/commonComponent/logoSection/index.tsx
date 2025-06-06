import { maxbetLogo } from "../../../assets/images";

interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src={maxbetLogo} {...props} alt="fairGame" style={{margin: "5px 5px 0",maxWidth: "250px",
    display: "inline-block" }} />;
}

export default LogoSection;
