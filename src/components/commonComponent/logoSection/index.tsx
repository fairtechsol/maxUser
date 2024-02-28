interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src="/maxbetLogo.png" {...props} alt="fairGame" style={{marginTop: "5px"}} />;
}

export default LogoSection;
