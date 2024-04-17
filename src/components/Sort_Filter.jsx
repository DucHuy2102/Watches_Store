import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sort_Filter = () => {
    return (
        <div>
            <div className='flex justify-center items-center'>
                <p>Show Filter</p>
            </div>
            <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faSort} />
                <p>Sắp xếp theo:</p>
            </div>
        </div>
    );
};

export default Sort_Filter;
