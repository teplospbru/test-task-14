import Cell from '../Cell/Cell';
import './Table.scss';
import { useEffect, useState } from 'react';


const Table = ({ data }) => {
    const [ sortName, setSortName ] = useState('Описание'); // определеяем название столбца сортировки
    const [ isDescending, setDescending ] = useState(true); // определяем направление сортировки
    const thead = [ 
        {title: 'Описание', name: 'description'},
        {title: 'Количество', name: 'quantity'},
        {title: 'Расстояние', name: 'distance'},
    ]

    // сортируем пагинированные посты
   if(data) {
        if(sortName === 'description') {
            data.sort((a,b) => {
                if(isDescending) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }
            });
        } else {
            data.sort((a,b) => {
                if(isDescending) {
                    if (a[sortName] > b[sortName]) {
                        return 1;
                    }
                    if (a[sortName] < b[sortName]) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a[sortName] < b[sortName]) {
                        return 1;
                    }
                    if (a[sortName] > b[sortName]) {
                        return -1;
                    }
                    return 0;
                };
            });
        }
   }
console.log(data)
    return data && (
        <table>
            <thead>
                <tr>
                    <th>
                        <div  className="th-content">
                            <span>Дата</span>
                        </div>
                    </th>
                    {
                        thead.map(({ title, name }) => (
                            <th><Cell 
                                name={ name }
                                title={ title }  
                                sortName={ sortName } 
                                setSortName={ setSortName }
                                isDescending={ name === sortName ? isDescending : true }
                                setDescending={ setDescending } 
                            /></th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(({ date, name: description, quantity, distance }) => (
                        <tr>
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