import React, {useEffect, useState, useCallback} from 'react';
import {FaAnglesLeft, FaAnglesRight} from 'react-icons/fa6';

import './SneakersList.css';
import {sneakersService} from '../../services/sneakers.service';
import SneakersItem from '../SneakersItem/SneakersItem';
import {useTelegram} from '../../hooks/useTelegram';

const SneakersList = () => {
    const [sneakers, setSneakers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [addedItem, setAddedItem] = useState([]);
    const {tg, queryId, user} = useTelegram();

    const limit = 8;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    useEffect(() => {
        sneakersService.getAll(null, null, 1).then(value => {
            setSneakers(value.rows);
            setTotalCount(value.count);
        });
    }, []);

    const onSendData = useCallback(async () => {
        tg.MainButton.hide();

        const data = {
            products: addedItem,
            total_price: getTotalPrice(addedItem),
            queryId,
            user
        };

        await sneakersService.sendOrders(data);
    }, [addedItem]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [tg, onSendData]);

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.price;
        }, 0);
    };

    const onAdd = (product) => {
        const alreadyAdded = addedItem.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItem.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItem, product];
        }

        setAddedItem(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy ${getTotalPrice(newItems)}`
            });
        }
    };

    return (
        <div className={'sneakers_list_wrapper'}>
            <div className={'sneakers_list'}>
                {sneakers && sneakers.map(sneakersPair =>
                    <SneakersItem key={sneakersPair.id} sneakersPair={sneakersPair} onAdd={onAdd}/>
                )}
            </div>

            <div className={'pagination'}>
                <div
                    className={page === 1 ? 'arrow_none' : 'arrow'}
                    onClick={() => setPage(page - 1)}
                >
                    <FaAnglesLeft/>
                </div>
                <div
                    className={page === pageCount ? 'arrow_none' : 'arrow'}
                    onClick={() => setPage(page + 1)}
                >
                    <FaAnglesRight/>
                </div>
            </div>
        </div>
    );
};

export default SneakersList;