
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SmoothDropdownModal = ( {show,setShow}:any) => {
    return (
        <Dropdown align="end"  show={show} onClick={() => setShow(false)} >
            <Dropdown.Menu className="min-max-info">
                <Dropdown.ItemText>

                    Min: 100 Max: 100000
                </Dropdown.ItemText>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SmoothDropdownModal;
