interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src="/maxbetLogo.png" {...props} alt="fairGame" />;
}

export default LogoSection;
