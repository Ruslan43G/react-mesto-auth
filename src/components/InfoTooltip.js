import React from 'react';

export default function InfoTooltip (props) {

    return (
        <section className={`popup ${props.options.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container_info'>
                <button className="popup__icon-close" onClick={props.onClose} type="reset"></button>
                <div className={`popup__info ${props.options.success ? 'popup__info_type_success' : 'popup__info_type_fail'}`}></div>
                <h3 className='popup__title_info'>{props.options.title}</h3>
            </div>
        </section>
    )
}