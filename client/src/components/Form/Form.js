import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import './Form.css';
import {useTelegram} from '../../hooks/useTelegram';
import {userService} from '../../services/user.service';

const Form = () => {
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [city, setCity] = useState();
    const {tg, queryId, onClose} = useTelegram();
    const {register} = useForm();

    const onSendData = useCallback(async () => {
        const data = {name, phone, city, queryId};

        onClose();
        await userService.sendUser(data);
    }, [name, phone, city]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        });
    }, []);

    useEffect(() => {
        if (!name || !phone || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone, city]);

    return (
        <div className={'form-wrapper'}>
            <div className={'form_title'}>Enter your data</div>
            <div className={'form'}>
                <input
                    placeholder={'name'}
                    {...register('name')}
                    onChange={e => setName(e.target.value)}
                />
                <div className={'error'}>{null}</div>
            </div>
            <div className={'form'}>
                <input
                    placeholder={'phone'}
                    {...register('phone')}
                    onChange={e => setPhone(e.target.value)}
                />
                <div className={'error'}>{null}</div>
            </div>
            <div className={'form'}>
                <input
                    placeholder={'city'}
                    {...register('city')}
                    onChange={e => setCity(e.target.value)}
                />
                <div className={'error'}>{null}</div>
            </div>
        </div>
    );
};

export default Form;