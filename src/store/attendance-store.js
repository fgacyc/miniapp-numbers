import { create } from 'zustand'
import {useUserStore} from "@/store/user-store.js";

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
    setTotalMembersNum: (total_members_num) => set({total_members_num}),
    setUserID: (user_sub) => set({user_sub}),


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

    getFormData: () => {
        return {
            satellite: useAttendanceStore.getState().satellite,
            pastoral_team: useAttendanceStore.getState().pastoral_team,
            cgl_name: useAttendanceStore.getState().cgl_name,
            date: useAttendanceStore.getState().date,
            total_members_num: useAttendanceStore.getState().total_members_num,
            cg_om_num: useAttendanceStore.getState().cg_om_num,
            cg_nb_num: useAttendanceStore.getState().cg_nb_num,
            cg_nf_num: useAttendanceStore.getState().cg_nf_num,
            cg_rnf_num: useAttendanceStore.getState().cg_rnf_num,
            cg_ac_num: useAttendanceStore.getState().cg_ac_num,
            cg_abs_num: useAttendanceStore.getState().cg_abs_num,
            cg_absence_reason: useAttendanceStore.getState().cg_absence_reason,
            service_om_num: useAttendanceStore.getState().service_om_num,
            service_nb_num: useAttendanceStore.getState().service_nb_num,
            service_nf_num: useAttendanceStore.getState().service_nf_num,
            service_rnf_num: useAttendanceStore.getState().service_rnf_num,
            service_ac_num: useAttendanceStore.getState().service_ac_num,
            service_abs_num: useAttendanceStore.getState().service_abs_num,
            service_absence_reason: useAttendanceStore.getState().service_absence_reason,

            // cg name
            cg_name: useAttendanceStore.getState().cg_name,

            // sub
            user_sub: useUserStore.getState().user_sub || "",

            // cg id
            cg_id: useAttendanceStore.getState().cg_id
        }
    },

    resetForm: () => {
        set({
            cg_om_num: "",
            cg_nb_num: "",
            cg_nf_num: "",
            cg_rnf_num: "",
            cg_ac_num: "",
            cg_abs_num: "",
            cg_absence_reason: "",
            service_om_num: "",
            service_nb_num: "",
            service_nf_num: "",
            service_rnf_num: "",
            service_ac_num: "",
            service_abs_num: "",
            service_absence_reason: "",
        })
    },
}))