import './Cell.scss';

// Ячейка заголовка таблицы
const Cell = ({ name, title, sortName, setSortName, isDescending, setDescending }) => {

    // Обработка клика по заголовку
    const clickHandler = () => {
        setSortName(name)
        if(name === sortName) {
            setDescending(isDescending => !isDescending);
        } else {
            setDescending(true)
        }
    };

    return (
        <div className="th-content" onClick={ () => clickHandler() } data-testid={ "sort-" + name }>
            <span>{ title }</span>
            <div className="th-content__arrow">
                <svg>
                    <use xlinkHref={ isDescending ? "#arrow-down" : "#arrow-up" }></use> 
                </svg>
            </div>
        </div>
    )
};

export default Cell;