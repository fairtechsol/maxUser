interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src="/logo.webp" {...props} alt="fairGame" />;
}

export default LogoSection;
