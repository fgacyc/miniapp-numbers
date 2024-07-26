import {useAttendanceStore} from "@/store/attendance-store.js";
import {useEffect, useState} from "react";
import {useCGs} from "@/api/cg.js";
import {getWeekDatesArray} from "@/components/tools.js";
import {getLocations, getPastoralTeams} from "@/config.js";
import {Select} from "@arco-design/web-react";
const Option = Select.Option;


export default function FormStep1(){
    const [currentLocation,setLocation] =useAttendanceStore(state => [state.satellite,state.setLocation])
    const [pastoralTeamOptions,setPastoralTeamOptions] = useState([])
    const [pastoralTeam,setPastoralTeam] = useAttendanceStore(state => [state.pastoral_team,state.setPastoralTeam])
    const {CGs} = useCGs();
    const [cglOptions,setCGLOptions] = useState([]);
    const [cg_id,setCGID] = useAttendanceStore(state => [state.cg_id,state.setCGID])
    const [CGLName,setCGLName] = useAttendanceStore(state => [state.cgl_name,state.setCGLName])
    const [CGName,setCGName] = useAttendanceStore(state => [state.cg_name,state.setCGName])
    const dateArray = getWeekDatesArray(4);
    const [date,setDate] = useAttendanceStore(state => [state.date,state.setDate])

    // console.log(CGs)
    // console.log(dateArray)

    useEffect(() => {
        if (currentLocation === '') return
        setPastoralTeamOptions(getPastoralTeams(currentLocation))
    }, [currentLocation]);

    useEffect(() => {
        if (pastoralTeam === '')  return
        if (!CGs) return;
        if(CGs.status !== true) return

        const cglOptions = CGs.data.filter(cgl => cgl.pastoral_team === pastoralTeam).map(cgl => {
            return {
                cgl_name: cgl.CG_leader,
                cg_id: cgl.CG_id,
                cg_name: cgl.CG_name
            }
        })
        // console.log("CGL Options",cglOptions)
        setCGLOptions(cglOptions)
    }, [pastoralTeam]);
    
    useEffect(() => {
        const cgl = cglOptions.filter(cgl => cgl.cg_id === cg_id)[0]
        if (!cgl) return;
        setCGName(cgl.cg_name)
        setCGLName(cgl.cgl_name)
    }, [cg_id]);


    return(
        <>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>Location</div>
                <div className={"flex w-full flex-wrap"}>
                    {
                        getLocations().map((location, index) => (
                            <div key={index} className={`border-2  px-4 py-2 rounded-md mr-2 mb-2
                                ${currentLocation === location ? 'border-[#313131]': "border-[#F1F1F1]"}
                                `}
                                 onClick={() => {
                                     // console.log(location)
                                     setLocation(location)
                                 }}
                            >
                                {location}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>Your Pastoral Team</div>
                <div className={"mt-2"}>
                    <Select
                        placeholder='Pastoral Team'
                        onChange={setPastoralTeam}
                        style={{width: '100%'}}
                    >
                        {pastoralTeamOptions && pastoralTeamOptions.length > 0 && pastoralTeamOptions.map((option, index) => (
                            <Option key={index} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={"mt-4"}>
                    <Select
                        placeholder='Cell Group Leader'
                        onChange={setCGID}
                        style={{width: '100%'}}
                    >
                        {cglOptions && cglOptions.length > 0 && cglOptions.map((option, index) => (
                            <Option key={index} value={option.cg_id}>
                                {option.cgl_name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>Attendance Date</div>
                <Select
                    placeholder='Date Range'
                    onChange={setDate}
                    style={{width: '100%'}}
                >
                    {dateArray && dateArray.length > 0 && dateArray.map((option, index) => (
                        <Option key={index} value={option}>
                            {index === 0 && option + " (This Week)"}
                            {index === 1 && option + " (Last Week)"}
                            {(index === 2 || index === 3) && option}
                        </Option>
                    ))}
                </Select>
            </div>
        </>
    )
}