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

export function validate(data) {
    // console.log(data)

    if (
        data.satellite === "" ||
        data.pastoral_team === "" ||
        data.cgl_name === "" ||
        data.cg_id === "" ||
        data.date === ""
    ){
        alert("Please fill in all the fields!")
        return false;
    }

    if (data.total_members_num === 0){
        alert("Total members number cannot be 0!")
        return false;
    }

    if (data.satellite ==="Kuchai WK"){
        return true;
    }


    if (data.cg_om_num < 0 ||
        data.cg_nb_num < 0 ||
        data.cg_nf_num < 0 ||
        data.cg_rnf_num < 0 ||
        data.cg_ac_num < 0 ||
        data.cg_abs_num < 0 ||
        data.service_om_num < 0 ||
        data.service_nb_num < 0 ||
        data.service_nf_num < 0 ||
        data.service_rnf_num < 0 ||
        data.service_ac_num < 0 ||
        data.service_abs_num < 0
    ){
        alert("The number of members cannot be negative!")
        return false;
    }

    if (data.cg_om_num === "" ||
        data.cg_nb_num === "" ||
        data.cg_nf_num=== "" ||
        data.cg_rnf_num === "" ||
        data.cg_ac_num === "" ||
        data.cg_abs_num === "" ||
        data.service_om_num === ""||
        data.service_nb_num === "" ||
        data.service_nf_num === "" ||
        data.service_rnf_num === "" ||
        data.service_ac_num === "" ||
        data.service_abs_num === ""
    ){
        alert("Please fill in all the number fields!")
        return false;
    }

    if (
        data.cg_om_num === 0 &&
        data.cg_nb_num === 0 &&
        data.cg_nf_num=== 0 &&
        data.cg_rnf_num === 0 &&
        data.cg_ac_num === 0 &&
        data.cg_abs_num === 0 &&
        data.cg_absence_reason !== "" &&
        data.service_om_num !== "" &&
        data.service_nb_num !== "" &&
        data.service_nf_num !== "" &&
        data.service_rnf_num !== "" &&
        data.service_ac_num !== "" &&
        data.service_abs_num !== "" &&
        data.total_members_num === data.service_om_num + data.service_abs_num
    )
    {
        //alert("If there is no CG, please fill in the absence reason!")
        return true;
    }


    //CYN special service, only for CYN, need to be removed later #TODO
    if (
        data.cg_om_num  === 0 &&
        data.cg_nb_num  === 0 &&
        data.cg_nf_num  === 0 &&
        data.cg_rnf_num  === 0 &&
        data.cg_ac_num  === 0 &&
        data.cg_abs_num  === 0
    ){
        //alert("If there is no CG, please fill in the absence reason!")
        return true;
    }


    if (data.cg_abs_num >0 && data.cg_absence_reason === ""){
        alert("Please fill in the absence reason!")
        return false;
    }

    if (data.service_abs_num >0 && data.service_absence_reason === ""){
        alert("Please fill in the absence reason!")
        return false;
    }

    // if (data.cg_abs_num ===0 && data.cg_absence_reason !== ""){
    //     alert("Please check the CG absence number")
    //     return false;
    // }
    //
    // if (data.service_abs_num === 0 && data.service_absence_reason !== ""){
    //     alert("Please check the Service absence number")
    //     return false;
    // }

    if (data.total_members_num !== data.cg_om_num + data.cg_abs_num){
        alert("Please check the OM number and CG absence number!")
        return false;
    }

    if (data.total_members_num !== data.service_om_num + data.service_abs_num){
        alert("Please check the OM number and Service absence number!")
        alert()
        return false;
    }

    return true;
}

export function timeDetect(weekDurationStr, createAtObj){
    const sunday = new Date(weekDurationStr.split("-")[1]+ " 12:59:59");
    const saturday = sunday.getTime() -24 * 60 * 60 * 1000;
    const saturdayObj = new Date(saturday);

    saturdayObj.setHours(12, 59, 59, 999);
    // console.log(saturdayObj.toLocaleString())
    // console.log(createAtObj.toLocaleString())
    return createAtObj >= saturdayObj;
}