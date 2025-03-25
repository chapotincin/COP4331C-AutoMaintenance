import './HomeOffer.css';

interface HomeOfferProps {
    imageSrc: string;
    iconSrc: string;
    text: string;
}

function HomeOffer({ imageSrc, iconSrc, text }: HomeOfferProps) {
    return (
        <div className="home-offer">
            <img src={imageSrc} alt={text} className="offer-image" />
            <div className="offer-text-box">
                <p className="offer-text">{text}</p>
                <img src={iconSrc} className="offer-icon"/>
            </div>
        </div>
    );
}

export default HomeOffer;
