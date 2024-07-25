import { create } from 'zustand'

export const useAttendanceStore = create((set) => ({
    satellite: "",
    pastoral_team: "",
    cgl_name: "",
    cg_name: "",
    date: "",
    total_members_num: "",
    cg_id: "",

    // cg activity attendance
    cg_om_num: 0,
    cg_nb_num: 0,
    cg_nf_num: 0,
    cg_rnf_num: 0,
    cg_ac_num: 0,
    cg_abs_num: 0,
    cg_absence_reason: "",

    // service attendance
    service_om_num: 0,
    service_nb_num: 0,
    service_nf_num: 0,
    service_rnf_num: 0,
    service_ac_num: 0,
    service_abs_num: 0,
    service_absence_reason: "",

    user_email: "",
    user_sub: "",

    setLocation: (satellite) => set({satellite}),
    setPastoralTeam: (pastoral_team) => set({pastoral_team}),
    setCGID: (cg_id) => { set({cg_id})},
    setCGLName: (cgl_name) => set({cgl_name}),
    setCGName: (cg_name) => set({cg_name}),
    setDate: (date) => set({date}),

    setCG_OM_Num: (cg_om_num) => set({cg_om_num}),
    setCG_NB_Num: (cg_nb_num) => set({cg_nb_num}),
    setCG_NF_Num: (cg_nf_num) => set({cg_nf_num}),
    setCG_RNF_Num: (cg_rnf_num) => set({cg_rnf_num}),
    setCG_AC_Num: (cg_ac_num) => set({cg_ac_num}),
    setCG_ABS_Num: (cg_abs_num) => set({cg_abs_num}),
    setCG_ABS_Reason: (cg_absence_reason) => set({cg_absence_reason}),

    setService_OM_Num: (service_om_num) => set({service_om_num}),
    setService_NB_Num: (service_nb_num) => set({service_nb_num}),
    setService_NF_Num: (service_nf_num) => set({service_nf_num}),
    setService_RNF_Num: (service_rnf_num) => set({service_rnf_num}),
    setService_AC_Num: (service_ac_num) => set({service_ac_num}),
    setService_ABS_Num: (service_abs_num) => set({service_abs_num}),
    setService_ABS_Reason: (service_absence_reason) => set({service_absence_reason}),


}))