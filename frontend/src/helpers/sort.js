// сортируем пагинированные строки
export const getSortedData = (title, isDescending, data) => {

    if(data) {
        if(title === 'Описание') {
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
        } else if(title === 'Количество') {
            data.sort((a,b) => {
                if(isDescending) {
                    if (a.quantity > b.quantity) {
                        return 1;
                    }
                    if (a.quantity < b.quantity) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a.quantity < b.quantity) {
                        return 1;
                    }
                    if (a.quantity > b.quantity) {
                        return -1;
                    }
                    return 0;
                };
            });
        } else if(title === 'Расстояние') {
            data.sort((a,b) => {
                if(isDescending) {
                    if (a.distance > b.distance) {
                        return 1;
                    }
                    if (a.distance < b.distance) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a.distance < b.distance) {
                        return 1;
                    }
                    if (a.distance > b.distance) {
                        return -1;
                    }
                    return 0;
                };
            });
        }
    }

    return data;
}