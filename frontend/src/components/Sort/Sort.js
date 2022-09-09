import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../Select/Select';
import './Sort.scss';

const Sort = () => {
    const [ filterItem, setFilterItem ] = useState('Не выбрано');
    const [ filterCondition, setFilterCondition ] = useState('Не выбрано');
    const [ value, setValue ] = useState(''); 
    const [ isFocused, setFocused ] = useState(false);
    const [ isWarning, setWarning ] = useState(false);
    const c = useRef();
    const [ conditions, setConditions ] = useState([ 'Не выбрано', 'равно', 'содержит', 'больше', 'меньше' ]);
    const items = [ 'Не выбрано', 'Описание', 'Количество', 'Расстояние' ];
    const [ warningMessage, setWarningMessage ] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    // Устанавливаем первоначальные значения в фильтре
    // если есть query-параметры, то берём оттуда
    useEffect(() => {
        if(searchParams.get("item")) {
            setFilterItem(searchParams.get("item"));
            if(searchParams.get("item") === 'Описание') {
                c.current = [ 'Не выбрано', 'равно', 'содержит' ];
            } else if(searchParams.get("item") === 'Количество' || 'Расстояние') {
                c.current = [ 'Не выбрано', 'равно', 'больше', 'меньше' ]
            }
            setConditions(c.current);
        };
        if(searchParams.get("condition")) {
            setFilterCondition(searchParams.get("condition"));
        };
        if(searchParams.get("value")) {
            setValue(searchParams.get("value"));
        };
    }, [])

    // Хэндлер инпута
    const inputHandler = e => {
        const input = e.target.value;
        setValue(input);
    }

    // Хэндлеры фокуса
    const focusHandler = e => {
        setFocused(true);
    }

    const blurHandler = e => {
        setFocused(false);
    }

    // Хэндлер нажатия на "Enter"
    const pressEnterHandler = e => {
        if(e.key === 'Enter' && isFocused) {
            validate();
        }
    }

    // Хэндлер клика по кнопке "Искать"
    const clickHandler = (e) => {
        validate();
    }

    // Валидация сортировки
    const validate = () => {
        if(filterItem !== 'Не выбрано' && filterCondition !== 'Не выбрано' && value.length > 0) {
            if(filterItem === 'Количество' || filterItem === 'Расстояние') {
                if(/^[0-9]+$/.test(value)) {
                    setWarning(false);
                    setSearchParams({ item: filterItem, condition: filterCondition, value });
                } else {
                    setWarning(true);
                    setWarningMessage('Введите число');
                }
            } else {
                setWarning(false);
                setSearchParams({ item: filterItem, condition: filterCondition, value });
            } 
        } else {
            setWarning(true);
            setWarningMessage('Введите все значения');
        } 
    }

    // Таймер показа сообщения ошибки
    useEffect(() => {
        if(isWarning) {
            setTimeout(setWarning, 1500, false);
        };
    }, [isWarning]);

    // Колбек установки значения списка options во втором селекте
    // в зависимости от выбранного значения в первом селекте
    const cb = (a) => {
        if(a === 'Не выбрано') {
            c.current = [ 'Не выбрано', 'равно', 'содержит', 'больше', 'меньше' ];
            setConditions([ 'Не выбрано', 'равно', 'содержит', 'больше', 'меньше' ]);
        } else if(a === 'Описание') {
            console.log(filterItem === 'Описание')
            c.current = [ 'Не выбрано', 'равно', 'содержит' ];
            if(c.current.some(item => item !== filterCondition)) {
                setFilterCondition('Не выбрано');
                setConditions([ 'Не выбрано', 'равно', 'содержит' ]);
            }
        } else {
            c.current = [ 'Не выбрано', 'равно', 'больше', 'меньше' ]
            if(c.current.some(item => item !== filterCondition)) {
                setFilterCondition('Не выбрано');
                setConditions([ 'Не выбрано', 'равно', 'больше', 'меньше' ]);
            }
        }
    };

    return (
        <div className='sort'>
            <div className='sort-container'>
                <Select options={ items } setFilter={ setFilterItem } item={ filterItem } cb={ cb } />
                <Select options={ conditions } setFilter={ setFilterCondition } item={ filterCondition } cb={ null } />
                <input 
                    type='text' 
                    placeholder='Введите зн...'
                    value={ value }
                    onChange={ inputHandler }
                    onKeyPress = { pressEnterHandler } 
                    onFocus={ focusHandler }
                    onBlur={ blurHandler }
                ></input>
            </div>
            <button onClick={ clickHandler }>Искать</button>
            { // сообщение об ошибке
                isWarning
                    ? (<div className='warning'>
                            <div className='icon'>
                                <svg>
                                    <use xlinkHref='#warning'></use>
                                </svg>
                            </div>
                            <span>{ warningMessage }</span>
                        </div>)
                    : null
            }
        </div>
    )
};

export default Sort;