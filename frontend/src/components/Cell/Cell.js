import './Cell.scss';

// Ячейка заголовка таблицы
const Cell = ({ title, sortTitle, setSortTitle, isDescending, setDescending }) => {

    // Обработка клика по заголовку
    const clickHandler = () => {
        setSortTitle(title)
        if(title === sortTitle) {
            setDescending(isDescending => !isDescending);
        } else {
            setDescending(true)
        }
    };

    return (
        <div className="th-content" onClick={ () => clickHandler() } data-testid={ "sort-" + title }>
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