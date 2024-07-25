export function capitalizeAllFirstLetters(str) {
    str = str.replace(/-/g, " ").replace(/_/g, " ");
    return str.replace(/\b\w/g, char => char.toUpperCase());
}


export const fetcher = (...args) => fetch(...args).then((res) => res.json())


export  function getWeekDatesArray(num){
    let dateArray = [];

    for (let i = 0; i < num; i++) {
        dateArray.push(getWeekDates(i));
    }
    // dateArray.reverse();
    return dateArray;
}

function getWeekDates(num) {
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
    };

    const getMonday = (date) => {
        let day = date.getDay() || 7;
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        return date;
    };

    let currentWeekMonday = getMonday(new Date());
    currentWeekMonday.setDate(currentWeekMonday.getDate() - 7 * num);

    let weekStart = new Date(currentWeekMonday);
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return formatDate(weekStart) + '-' + formatDate(weekEnd);
}

export function calculateTwoDaysAgo(inputDateString) {
    // 将输入的日期字符串转换为日期对象
    const inputDate = new Date(inputDateString);

    // 计算两天前的日期
    const twoDaysAgo = new Date(inputDate);
    twoDaysAgo.setDate(inputDate.getDate() - 2);

    // 获取年、月、日的部分
    const year = twoDaysAgo.getFullYear();
    const month = String(twoDaysAgo.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(twoDaysAgo.getDate()).padStart(2, '0');

    // 构建两天前的日期字符串
    return `${year}/${month}/${day}`;
}