import './NavTab.css';

function NavTab() {
    return (
        <nav className='project-nav'>
            <div className='project-nav__container'>
                <ul className='project-nav__list'>
                    <li className='project-nav__link' href='#'>О проекте</li>
                    <li className='project-nav__link' href='#'>Технологии</li>
                    <li className='project-nav__link' href='#'>Студент</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavTab;
