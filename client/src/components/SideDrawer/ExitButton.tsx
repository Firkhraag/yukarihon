import React from 'react';
import exit from '../../assets/images/exit.svg';
import './ExitButton.css';

type ExitButtonProps = {
    closeButtonClick: () => void
}

const ExitButton = ({ closeButtonClick }: ExitButtonProps) => {
    return <div className="exit-btn-cnt full-width">
        <img className="exit-btn pointer" src={exit} alt="Выйти из меню" onClick={closeButtonClick} />
    </div>
}

export default ExitButton;