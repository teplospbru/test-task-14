import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPagination } from '../../helpers/pagination';
import './Pagination.scss';

const Pagination = ({ data }) => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ pagination, setPagination ] = useState(); // храним 
    const [ filterItem, setFilterItem ] = useState();
    const [ filterCondition, setFilterCondition ] = useState();
    const [ value, setValue ] = useState(''); 

    useEffect(() => {
        const page = searchParams.get("page");
        if(data) {
            setPagination(getPagination(page, data));
        };
    }, [searchParams, data]);

    useEffect(() => {
        if(searchParams.get("item")) setFilterItem(searchParams.get("item"));
        if(searchParams.get("condition")) setFilterCondition(searchParams.get("condition"));
        if(searchParams.get("value")) setValue(searchParams.get("value"));
    }, [searchParams]);

       // Хэндлер стрелки влево
       const leftArrowClickHandler = () => {
            const page = searchParams.get("page") || 1;
            // Определяем номер страницы пагинации, куда сошлётся кнопа "назад"
            const clickBackValue = (page - 1) >= 1 ? (page - 1) : page;
            params(clickBackValue);
       }

       // Хэндлер стрелки вправо
       const rightArrowClickHandler = () => {
            const page = searchParams.get("page") || 1;
            // Определяем номер страницы пагинации, куда сошлётся кнопа "вперед"
            const clickForwardValue = (Number(page) + 1) <= Math.ceil(data.length / 10) ? (Number(page) + 1) : page;
            params(clickForwardValue);
        }

        // устанавливаем query-параметры
        const params = (clickValue) => {
            if(searchParams.get("item") && searchParams.get("condition") && searchParams.get("value")) {
                setSearchParams({ item: filterItem, condition: filterCondition, value, page: clickValue });
            } else {
                setSearchParams({ page: clickValue });
            }
        }

    return pagination && (
        <div className='pagination'>
            <div className='icon' onClick={ leftArrowClickHandler }>
                <svg>
                    <use xlinkHref="#arrow-left"></use> 
                </svg>
            </div>
            {
                pagination.map((item, index) => (
                    item == searchParams.get("page") || item === '...' 
                        ? <div className='page' key={ '4_' + index }>
                            <span>{ item }</span>
                        </div>
                        : <div className='page' key={ '4_' + index }>
                            <Link to={
                                '/?' 
                                + (filterItem ? 'item=' + filterItem + '&' : '')
                                + (filterCondition ? 'condition=' + filterCondition + '&' : '')
                                + (value ? 'value=' + value + '&' : '')
                                + 'page=' + item
                            }>{ item }</Link>
                        </div>
                ))
            }
            <div className='icon' onClick={ rightArrowClickHandler }>
                <svg>
                    <use xlinkHref="#arrow-right"></use> 
                </svg>
            </div>
        </div>
    )
};

export default Pagination;