
import { Dropdown } from 'react-bootstrap';

const SmoothDropdownModal = ( {show,minMax}:any) => {
 
    return (
        <Dropdown align="end"  show={show} >
            <div style={{width: "10%"}}>
            <Dropdown.Menu className="min-max-info w-20">
                <Dropdown.ItemText>
                  {minMax}<br></br>
                    {/* Max:<br></br> {max} */}
                </Dropdown.ItemText>
            </Dropdown.Menu>
            </div>
        </Dropdown>
    );
  
};

export default SmoothDropdownModal;
