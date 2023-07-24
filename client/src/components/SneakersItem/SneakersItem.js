import React from 'react';

import './SneakersItem.css';

const SneakersItem = ({sneakersPair, onAdd}) => {
    const {brand_name, model, price, img} = sneakersPair;
    const awsImgUrl = 'https://epic-sneakers.s3.amazonaws.com/';

    const onAddHandler = () => {
        onAdd(sneakersPair);
    };

    return (
        <div className={'sneakers_item_wrapper'}>
            <div className={'sneakers_card'}>
                <div className={'sneakers_card_poster'}>
                    <img src={`${awsImgUrl}${img[0].path}`} alt={brand_name}/>
                </div>
                <div className={'sneakers_card_short_info'}>
                    <div className={'sneakers_card_name'}>
                        <span>Sneakers </span>
                        <span><b>{brand_name}</b></span>
                        <span> {model}</span>
                    </div>
                    <div className={'sneakers_cars_price_basket'} onClick={onAddHandler}>
                        <div><span>{price} $</span></div>
                        <div className={'sneakers_buy'}>Buy now</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SneakersItem;