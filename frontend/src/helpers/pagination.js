// получаем список десяти или меньше строк для текущей страницы пагинации
export const getPaginatedData = (currentPage, data) => {
    const page = currentPage || 1;
    const items = [];
    let from, to;

    if(data.length > 10) { // если строк больше 10
        from = (page * 10) - 10;
        to = data.length;
        if((page * 10) > data.length) {
            for(let i = from; i <= to; i++) {
                items.push(data[i-1]);
            };
        } else {
            from = (page * 10) - 9;
            to = page * 10;
            for(let i = from; i <= to; i++) {
                items.push(data[i-1]);
            };
        }
    } else { // если строк меньше 10
        from = 1;
        to = data.length;
        for(let i = from; i <= to; i++) {
            items.push(data[i-1]);
        };
    }
    return items;
}

// Возвращает объект со свойствами для пагинации
export const getPagination = (page, data) => {
    let currentPage = Number(page) || 1;

    if(data.length <= 10) {
        return null;
    } else {
        const first = 1;
        let firstDots, beforeCurrentPage, afterCurrentPage, lastDots;
        const last = Math.ceil(data.length / 10);
        let arr = [];

        if(currentPage !== first && currentPage !== last) {

            if(currentPage - 1 > first) {
                beforeCurrentPage = currentPage - 1;
                if(beforeCurrentPage - 1 > first) {
                    firstDots = '...';
                }
            }
            if(currentPage + 1 < last) {
                afterCurrentPage = currentPage + 1;
                if(afterCurrentPage + 1 < last) {
                    lastDots = '...';
                }
            }

            arr = [first, firstDots, beforeCurrentPage, currentPage, afterCurrentPage, lastDots, last];

        } else if(currentPage !== first && currentPage === last) {

            if(last - 1 > first) {
                beforeCurrentPage = last - 1;
                if(beforeCurrentPage - 1 > first + 1) {
                    firstDots = '...';
                }
            }

            arr = [first, firstDots, beforeCurrentPage, afterCurrentPage, lastDots, last];

        } else if( currentPage === first && currentPage !== last) {

            if((first + 1) < last) {
                afterCurrentPage = first + 1;
                if(afterCurrentPage + 1 < last - 1) {
                    lastDots = '...';
                }
            }

            arr = [first, firstDots, beforeCurrentPage, afterCurrentPage, lastDots, last];

        }
        return arr.filter(item => item !== undefined);
    } 
}