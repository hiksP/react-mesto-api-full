export function ImagePopup({onClose, card}) {

    return(
        <>
            <div className={`popup popup_image ${ card && 'popup_opened' }`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <figure className="popup__place-box">
                <button className="popup__close popup__close_image" onClick={onClose} type="button"></button>
                <img className="popup__place-picture" src={card?.link} alt={card?.name}/>
                <figcaption className="popup__place-text">
                    <p className="popup__place-name">{card?.name}</p>
                </figcaption>
            </figure>
            </div>
        </>   
    );
}