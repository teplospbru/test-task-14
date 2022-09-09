// Кастомный select
import { useEffect, useRef, useState } from 'react';

const Select = ({ options, setFilter, item = 'Не выбрано', cb }) => {
    const div = useRef();
    const [ width, setWidth ] = useState(); // ширина select
    const [ isOpen, setOpen ] = useState(false); // показ options
    const [ isOption, setOption ] = useState(item); // выбранный option

    // Запоминаем ширину селекта
    useEffect(() => {
        setWidth(div.current.getBoundingClientRect().width + 'px');
    }, [div]);

    // Это нужно раскоментировать, если начальное значение не будет поступать от родителя
    // useEffect(() => {
    //     setFilter(item);
    // }, []);

    // Устанавливаем слушатель кликов по body, чтобы реализовать скрытие options при 
    // клике мимо него
    useEffect(() => {
        const body = document.querySelector('body');

        const bodyClickHandler = () => {
            if(isOpen) {
                setOpen(false)
            }
        }

        body.addEventListener('click', bodyClickHandler,  false);
        return () => body.removeEventListener('click', bodyClickHandler, false);
    }, [isOpen])

    // Хэндлер клика по стрелке
    const handleArrowClick = () => {
        setOpen(isOpen => !isOpen);
    }

    // Хэндлер клика по option
    const handleOptionClick = (option) => {
        setOption(option.target.innerText);
        setFilter(option.target.innerText);
        setOpen(false);
        if(cb) cb(option.target.innerText);
    }

    useEffect(() => {
        setOption(item);
    }, [item])

    return (
        <div className='select' ref={ div } onClick={ e => e.stopPropagation() }>
            <div className='select-helper' onClick={ () => handleArrowClick() }>
                <span>{ isOption }</span>
            </div>
            <div className='icon' onClick={ () => handleArrowClick() }>
                <svg>
                    <use xlinkHref={ isOpen ? '#up' : '#down' }></use>
                </svg>
            </div>
            {
                isOpen 
                    ? <div className='options' style={{ width }}>
                        {
                            options.map(option => (
                                <div className='option' onClick={ (option) => handleOptionClick(option) } key={ option + '_1' }>{ option }</div> 
                            ))
                        }
                    </div>
                    : null
            }
        </div>
    )
};

export default Select;