import Cell from '../Cell/Cell';
import './Table.scss';
import { useState } from 'react';
import { getSortedData } from '../../helpers/sort';


const Table = ({ data }) => {
    const [ sortTitle, setSortTitle ] = useState('Описание'); // определеяем название столбца сортировки
    const [ isDescending, setDescending ] = useState(true); // определяем направление сортировки

    // сортируем пагинированные строки
    getSortedData(sortTitle, isDescending, data);

    return data && (
        <table>
            <thead>
                <tr>
                    <th key='7_77'>
                        <div  className="th-content">
                            <span>Дата</span>
                        </div>
                    </th>
                    {
                        [ 'Описание', 'Количество', 'Расстояние' ].map((title, index) => (
                            <th key={ '7_' + index }><Cell 
                                title={ title }  
                                sortTitle={ sortTitle } 
                                setSortTitle={ setSortTitle }
                                isDescending={ title === sortTitle ? isDescending : true }
                                setDescending={ setDescending } 
                            /></th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(({ date, name: description, quantity, distance }, index) => (
                        <tr key={ '8_' + index }>
                            <td>{ date }</td>
                            <td>{ description }</td>
                            <td>{ quantity }</td>
                            <td>{ distance }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
};

export default Table;