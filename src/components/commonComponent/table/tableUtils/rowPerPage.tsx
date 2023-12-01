import React from "react";
import isMobile from "../../../../utils/screenDimension";
import CustomInput from "../../input";

interface RowPerPageProps {
  value: number;
  onChange: (value: number) => void;
}

const RowPerPage: React.FC<RowPerPageProps> = ({ value, onChange }) => {
  // Define an array of options
  const options = [,
    {
      name:"10",
      value:10
    },
    {
      name:"20",
      value:20
    },
    {
      name:"30",
      value:30
    },{
      name:"40",
      value:40
    }];

  return (
    <div
      className={`d-flex align-items-center ${isMobile ?"title-12 flex-column":"gap-2 "}`}
    >
      <label>Show</label>
      {/* Dropdown for selecting items per page */}
      <CustomInput
        type="select"
        value={value}
        onChange={(e: any) => onChange(Number(e.target.value))}
        customStyle={`d-flex`}
        options={options}
        isUnderlinedInput={isMobile}
        inputClass={"py-1"}
      />
      <label>entries</label>
    </div>
  );
};

export default RowPerPage;
