import './Logo.css';
import logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';
import { PAGES } from '../../utils/constants';

function Logo() {
    const history = useHistory();

    function handleClick() {
        history.push(PAGES.MAIN);
    }

    return (
        <img className='logo' alt='Логотип' src={logo} onClick={handleClick}/>
    );    
};

export default Logo;