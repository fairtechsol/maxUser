export const formattedMinMax = (min: any, max: any) => {
  return (
    <span className="f400 title-12">
      <span className="f700">Min:</span> {min}{" "}
      <span className="f700">Max:</span> {max}
    </span>
  );
};

export const handleRoundId = (id: any) => {
  try {
    if (!id && id !== 0) {
      return 0;
    }
    const idString = id + "";
    if (idString.length > 0 && !idString.includes(".")) {
      return id;
    }
    const IdParts = idString.split(".");
    return IdParts[1] || 0;
  } catch (error) {
    console.error(error);
  }
};
