import React from "react";
import { Form } from "react-bootstrap";

interface RowPerPageProps {
  value: number;
  onChange: (value: number) => void;
}

const RowPerPage: React.FC<RowPerPageProps> = ({ value, onChange }) => {
  // Define an array of options
  const options = [2, 10, 15, 20];

  return (
    <Form.Group controlId="itemsPerPage" className="mb-3">
      <label>Show</label>
      {/* Dropdown for selecting items per page */}
      <select
        className="rowPerPageSelect mx-2"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {/* Map over the options array to create option elements */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label>entries</label>
    </Form.Group>
  );
};

export default RowPerPage;
