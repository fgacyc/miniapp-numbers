
import {InputNumber, Input} from "@arco-design/web-react";
import {useAttendanceStore} from "@/store/attendance-store.js";
import InputPIN from "@/components/InputPIN.jsx";

const TextArea = Input.TextArea;



export default function FormStep2(){
    const roles = ["OM","NB","NF","RNF","AC","ABS"];
    const [cg_om_num, setCG_OM_Num,
        cg_nb_num, setCG_NB_Num,
        cg_nf_num, setCG_NF_Num,
        cg_rnf_num, setCG_RNF_Num,
        cg_ac_num, setCG_AC_Num,
        cg_abs_num, setCG_ABS_Num,
        cg_absence_reason, setCG_ABS_Reason]
    = useAttendanceStore(state => [
        state.cg_om_num,  state.setCG_OM_Num,
        state.cg_nb_num,  state.setCG_NB_Num,
        state.cg_nf_num,  state.setCG_NF_Num,
        state.cg_rnf_num,  state.setCG_RNF_Num,
        state.cg_ac_num,  state.setCG_AC_Num,
        state.cg_abs_num,  state.setCG_ABS_Num,
        state.cg_absence_reason , state.setCG_ABS_Reason
    ])

    const [service_om_num, setService_OM_Num,
        service_nb_num, setService_NB_Num,
        service_nf_num, setService_NF_Num,
        service_rnf_num, setService_RNF_Num,
        service_ac_num, setService_AC_Num,
        service_abs_num, setService_ABS_Num,
        service_absence_reason, setService_ABS_Reason]
    = useAttendanceStore(state => [
        state.service_om_num,  state.setService_OM_Num,
        state.service_nb_num,  state.setService_NB_Num,
        state.service_nf_num,  state.setService_NF_Num,
        state.service_rnf_num,  state.setService_RNF_Num,
        state.service_ac_num,  state.setService_AC_Num,
        state.service_abs_num,  state.setService_ABS_Num,
        state.service_absence_reason , state.setService_ABS_Reason
    ])


    return(
        <>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>Numbers</div>
                <InputNumber
                    placeholder='Number of Group Members'
                    min={0}
                    max={50}
                />
            </div>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>CG Attendance</div>
                <div className={"flex justify-between items-center mb-4"}>
                    <InputPIN label={"OM"} value={cg_om_num} onChange={setCG_OM_Num} />
                    <InputPIN label={"NB"} value={cg_nb_num} onChange={setCG_NB_Num} />
                    <InputPIN label={"NF"} value={cg_nf_num} onChange={setCG_NF_Num} />
                    <InputPIN label={"RNF"} value={cg_rnf_num} onChange={setCG_RNF_Num} />
                    <InputPIN label={"AC"} value={cg_ac_num} onChange={setCG_AC_Num} />
                    <InputPIN label={"ABS"} value={cg_abs_num} onChange={setCG_ABS_Num} />
                </div>
                <TextArea rows={3} placeholder='Remarks' />
            </div>
            <div className={"mt-6 "}>
                <div className={"font-bold text-lg mb-2"}>Service Attendance</div>
                <div className={"flex justify-between items-center mb-4"}>
                    <InputPIN label={"OM"} value={service_om_num} onChange={setService_OM_Num}/>
                    <InputPIN label={"NB"} value={service_nb_num} onChange={setService_NB_Num}/>
                    <InputPIN label={"NF"} value={service_nf_num} onChange={setService_NF_Num}/>
                    <InputPIN label={"RNF"} value={service_rnf_num} onChange={setService_RNF_Num}/>
                    <InputPIN label={"AC"} value={service_ac_num} onChange={setService_AC_Num}/>
                    <InputPIN label={"ABS"} value={service_abs_num} onChange={setService_ABS_Num}/>
                </div>
                <TextArea rows={3} placeholder='Remarks' />
            </div>
        </>
    )
}