const NotSet = ({ item }: any) => {
  return <span className="cursor-pointer">{item ?? "-"}</span>;
};

export default NotSet;
