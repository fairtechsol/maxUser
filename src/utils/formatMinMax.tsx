export const formattedMinMax = (min: any, max: any) => {
  return (
    <span className="f400 title-12">
      <span className="f700">Min:</span> {min}{" "}
      <span className="f700">Max:</span> {max}
    </span>
  );
};

export const handleRoundId = (id: any) => {
  if (id === undefined) return;
  if (id + "".length > 0 && !(id + "")?.includes(".")) {
    return id;
  }
  // if (typeof id !== "string" || !id.includes(".")) {
  //   return 0;
  // }
  const Id = id?.split(".");
  return Id[1];
};
