// Фильтруем данные в соотвествии с query-параметрами урла
export const getFilteredData = (item, condition, value, data) => {
    let arr = [];

    if(data) {
        if(item === 'Описание') {
            switch(condition) {
                case 'равно':
                    arr = data.filter(item => item.name === value);
                    break;
                case 'содержит':
                    arr = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
                    break;
                default:
                    arr = data;
            }
        } else if(item === 'Количество') {
            switch(condition) {
                case 'равно':
                    arr = data.filter(item => item.quantity === Number(value));
                    break;
                case 'больше':
                    arr = data.filter(item => item.quantity > value);
                    break;
                case 'меньше':
                    arr = data.filter(item => item.quantity < value);
                    break;
                default:
                    arr = data;
            }
        } else if(item === 'Расстояние') {
            switch(condition) {
                case 'равно':
                    arr = data.filter(item => item.distance === Number(value));
                    break;
                case 'больше':
                    arr = data.filter(item => item.distance > value);
                    break;
                case 'меньше':
                    arr = data.filter(item => item.distance < value);
                    break;
                default:
                    arr = data;
            }
        } else {
            arr = data;
        }
    }
    return arr;
}