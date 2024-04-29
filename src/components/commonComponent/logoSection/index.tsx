interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src="/maxbetLogo.png" {...props} alt="fairGame" style={{margin: "5px 5px 0", }} />;
}

export default LogoSection;
