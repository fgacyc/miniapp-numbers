
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {calculateTwoDaysAgo} from "@/components/tools.js";


function culDate(date,type){
    if (type === "Service"){
        return date.substring(16,21);
    }
    else if(type==="CG"){
        return calculateTwoDaysAgo(date.substring(11,21)).substring(5,10);
    }
}

export default function AttendanceLineChart({data,type}) {
    // console.log(data)
    let newData = [];
    for (let record of data){
        newData.push({
            name: culDate(record.date,type),
            OM: record.om_num,
            NB: record.nb_num,
            NF: record.nf_num,
            RNF : record.rnf_num,
            AC: record.ac_num,
            ABS : record.abs_num,
        })
    }
    // console.log(newData)
    const weekDuration =12;
    newData = newData.slice(0,weekDuration);
    newData.reverse();

    return (
        <ResponsiveContainer width="100%" height="50%">
            <div className={"text-center relative bottom-[-15px]"}>{type}</div>
            <LineChart
                layout="horizontal"
                // width={500}
                // height={300}
                data={newData}
                margin={{
                    top: 20,
                    right: 10,
                    left: 0,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis type="number" />
                <XAxis dataKey="name" type="category"  angle={0} textAnchor="end" />
                <Tooltip />
                <Legend />
                <Line dataKey="OM" stroke="#fa5252" strokeWidth={2} type="monotone" />
                <Line dataKey="NB" stroke="#3399CC" strokeWidth={2} type="monotone" />
                <Line dataKey="NF" stroke="#33CC66" strokeWidth={2} type="monotone"  />
                <Line dataKey="RNF" stroke="#CC3399" strokeWidth={2} type="monotone"  />
                <Line dataKey="AC" stroke="#CC9933" strokeWidth={2} type="monotone"  />
                <Line dataKey="ABS" stroke="#9966CC" strokeWidth={2} type="monotone"  />
            </LineChart>
        </ResponsiveContainer>
    );
}
