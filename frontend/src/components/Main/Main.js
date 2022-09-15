import Sort from '../Sort/Sort';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPaginatedData } from '../../helpers/pagination';
import { getFilteredData } from '../../helpers/filter';

const Main = ({ data }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ filteredData, setFilteredData ] = useState(); // здесь храним отфильтрованные данные
    const [ paginatedData, setPaginatedData ] = useState(); // здесь храним пагинированные данные

    // фильтруем и пагинируем данные
    useEffect(() => {
        if(data) {
            const item = searchParams.get("item");
            const condition = searchParams.get("condition");
            const value = searchParams.get("value");
            const page = searchParams.get("page");
            const arr = getFilteredData(item, condition, value, data);
            setFilteredData(arr);
            setPaginatedData(getPaginatedData(page, arr));
        }
    }, [searchParams, data]);

    return data 
        ? (
            <div>
                <Sort /> 
                <Table data={ paginatedData } />
                <Pagination data={ filteredData } />
            </div>
        )
        : ( <p>Loading...</p> )
};

export default Main;