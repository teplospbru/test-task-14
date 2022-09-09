import Sort from '../Sort/Sort';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Main = ({ data }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ filteredData, setFilteredData ] = useState();

    useEffect(() => {
        const value = searchParams.get("value")
        if(data) {
            if(searchParams.get("item") === 'Описание') {
                switch(searchParams.get("condition")) {
                    case 'равно':
                        setFilteredData(data.filter(item => item.name === value));
                        break;
                    case 'содержит':
                        setFilteredData(data.filter(item => item.name.includes(value)));
                        break;
                    default:
                        setFilteredData(data);
                }
            } else if(searchParams.get("item") === 'Количество') {
                switch(searchParams.get("condition")) {
                    case 'равно':
                        setFilteredData(data.filter(item => item.quantity == value));
                        break;
                    case 'больше':
                        setFilteredData(data.filter(item => item.quantity > value));
                        break;
                    case 'меньше':
                        setFilteredData(data.filter(item => item.quantity < value));
                        break;
                    default:
                        setFilteredData(data);
                }
            } else if(searchParams.get("item") === 'Расстояние') {
                switch(searchParams.get("condition")) {
                    case 'равно':
                        setFilteredData(data.filter(item => item.distance == value));
                        break;
                    case 'больше':
                        setFilteredData(data.filter(item => item.distance > value));
                        break;
                    case 'меньше':
                        setFilteredData(data.filter(item => item.distance < value));
                        break;
                    default:
                        setFilteredData(data);
                }
            } else {
                setFilteredData(data);
            }
        }
        console.log(filteredData)
    }, [searchParams, data]);

    return data 
        ? (
            <div>
                <Sort /> 
                <Table data={ filteredData } />
                <Pagination />
            </div>
        )
        : ( <p>Loading...</p> )
};

export default Main;