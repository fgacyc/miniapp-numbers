import NavBar from "@/components/nav-bar.jsx";
import {useParams} from "react-router-dom";
import {useAttendances} from "@/api/cg.js";
import {useEffect, useState} from "react";
import {Space} from "antd-mobile";
import AttendanceLineChart from "@/pages/CGLAttendance/AttendanceLineChart.jsx";
import {Table} from "@arco-design/web-react";

export default function History() {
    const {cg_id} = useParams();
    const {attendances, isLoading, isError} = useAttendances(cg_id);
    const [attendanceData, setAttendanceData] = useState([{}]);
    const [CGLineChartData, setCGLineChartData] = useState(null);
    const [ServiceLineChartData, setServiceLineChartData] = useState(null);
    const attendanceTypeList = [
        {
            text: "CG",
            value: "CG",
        },
        {
            text: "Service",
            value: "Service",
        }
    ]
    const columns = [
        {
            key: 'date',
            title: 'Date',
            dataIndex: 'date',
            width: 120,
            render: (_, record) => <div>{record.date}</div>,
            sorter: (a, b) => new Date(a.date.split('-')[0]) - new Date(b.date.split('-')[0]),
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            width: 85,
            render: (_, record) => <div>{record.type}</div>,
            sorter: (a, b) => a.type.localeCompare(b.type),
            filters: attendanceTypeList,
            onFilter: (value, row) => {
                return row.type.toLowerCase().includes(value.toLowerCase());
            },
            filterMultiple: false,
        },
        {
            key: 'om_num',
            title: 'OM',
            dataIndex: 'om_num',
            width: 50,
            render: (_, record) => <div>{record.om_num}</div>,
            sorter: (a, b) => a.om_num - b.om_num,
        },
        {
            key: 'nb_num',
            title: 'NB',
            dataIndex: 'nb_num',
            width: 50,
            render: (_, record) => <div>{record.nb_num}</div>,
            sorter: (a, b) => a.nb_num - b.nb_num,
        },
        {
            key: 'nf_num',
            title: 'NF',
            dataIndex: 'nf_num',
            width: 50,
            render: (_, record) => <div>{record.nf_num}</div>,
            sorter: (a, b) => a.nf_num - b.nf_num,
        },
        {
            key: 'rnf_num',
            title: 'RNF',
            dataIndex: 'rnf_num',
            width: 50,
            render: (_, record) => <div>{record.rnf_num}</div>,
            sorter: (a, b) => a.rnf_num - b.rnf_num,
        },
        {
            key: 'ac_num',
            title: 'AC',
            dataIndex: 'ac_num',
            width: 50,
            render: (_, record) => <div>{record.ac_num}</div>,
            sorter: (a, b) => a.ac_num - b.ac_num,
        },
        {
            key: 'abs_num',
            title: 'ABS',
            dataIndex: 'abs_num',
            width: 50,
            render: (_, record) => <div>{record.abs_num}</div>,
            sorter: (a, b) => a.abs_num - b.abs_num,
        },
        // {
        //     key: 'total_num',
        //     title: 'Numbering',
        //     dataIndex: 'total_num',
        //     width: 50,
        //     render: (_, record) => <div>{record.total_num}</div>,
        //     sorter: (a, b) => a.total_num - b.total_num,
        // },
        {
            key: 'total_num',
            title: 'Total',
            //dataIndex: 'total_num',
            width: 50,
            render: (_, record) => <div>{record.om_num + record.nb_num + record.nf_num + record.rnf_num + record.ac_num  }</div>,
            //sorter: (a, b) => a.total_num - b.total_num,
        }
    ];

    useEffect(() => {
        if (isLoading) return;
        if(!attendances.status) return;

        const transform_attendance_data = transformData(attendances.data)
            .sort((a, b) => new Date(b.date.split('-')[0]) - new Date(a.date.split('-')[0]))
        // console.log(transform_attendance_data)
        setAttendanceData(transform_attendance_data);
        setCGLineChartData(
            transform_attendance_data.filter((item) => item.type === "CG")
        )
        setServiceLineChartData(
            transform_attendance_data.filter((item) => item.type === "Service")
        )

    }, [isLoading]);

    const transformData = (data) => {
        if (!data) return;
        console.log("data12312", data)
        return data.flatMap(item => {
            // Create a new object for "cg" data
            const cgData = {
                key: item.key,
                type: "CG",
                date: item.date,
                ac_num: item.cg_ac_num,
                nb_num: item.cg_nb_num,
                abs_num: item.cg_abs_num,
                nf_num: item.cg_nf_num,
                om_num: item.cg_om_num,
                rnf_num: item.cg_rnf_num,
                total_num: item.total_members_num,
                absence_reason: "Absence_reason: " + item.cg_absence_reason,
            };

            // Create a new object for "service" data
            const serviceData = {
                key:item.key,
                type: "Service",
                date: item.date,
                ac_num: item.service_ac_num,
                nb_num: item.service_nb_num,
                abs_num: item.service_abs_num,
                nf_num: item.service_nf_num,
                om_num: item.service_om_num,
                rnf_num: item.service_rnf_num,
                total_num: item.total_members_num,
                absence_reason: "Absence_reason: " + item.service_absence_reason,
            };

            return [cgData, serviceData];
        });
    }


    // console.log(attendances);

    return (
        <div className={"h-screen bg-[#00D97C]"}>
            <NavBar ifShowBackArrow={true}>History</NavBar>
            <div className={"bg-[#00D97C] h-[calc(100vh-45px)] overflow-y-auto"}>
                <div className={"bg-white mt-6  rounded-t-2xl px-4 py-4"}>
                    <div className={"font-bold text-2xl  "}>
                        CG History
                    </div>
                    <div className={"bg-[#F5F5F5] h-16 rounded mt-2 relative flex  items-center py-2 px-4"}>
                        {
                            attendanceData && <div className={"z-20"}>
                                <div className={"font-bold"}>{attendances && attendances.data[0].cgl_name}</div>
                                <span className={"text-[#64748B]"}>{attendances && attendances.data[0].satellite}</span>
                                <span className={"text-[#64748B]"}> | </span>
                                <span className={"text-[#64748B]"}>{attendances && attendances.data[0].pastoral_team}</span>
                            </div>
                        }
                        <img src={"/sheep.svg"} alt="sheep logo" className={"h-30 w-30 absolute right-0"}/>

                    </div>

                    <div className={""}>
                        <div className={"bg-white mb-4 rounded h-[600px]"}>
                            {
                                CGLineChartData &&
                                <AttendanceLineChart data={CGLineChartData} type={"CG"}/>
                            }
                            {
                                ServiceLineChartData &&
                                <AttendanceLineChart data={ServiceLineChartData} type={"Service"}/>
                            }
                        </div>

                        <div className={"bg-white pb-4"}>
                            {
                                attendanceData.length !== 1 && <Table
                                    columns={columns}
                                    data={attendanceData}
                                    expandedRowRender={(record) => record.absence_reason}
                                    expandProps={{
                                        width: window.innerWidth > 768 ? 15 : 25,
                                        expandRowByClick: true,
                                        rowExpandable: (record) => record.absence_reason !== null && record.absence_reason !== ''
                                            && record.absence_reason !== 'Absence_reason: ',
                                    }}
                                    scroll={{
                                        x: window.innerWidth * 0.9,
                                        y: window.innerHeight,
                                    }}
                                    renderPagination={(paginationNode) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: 10,
                                            }}
                                        >
                                            <Space>
                                                <span className={"ml-4"}>Items: {attendanceData.length}</span>
                                            </Space>
                                            {paginationNode}
                                        </div>
                                    )}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}