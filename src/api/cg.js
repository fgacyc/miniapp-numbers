import {fetcher} from "@/components/tools.js";
import useSWR from "swr";
const host = import.meta.env.VITE_API_HOST;


export function useCGs() {
    const { data, error, isLoading } = useSWR(`${host}/cg/active`, fetcher)

    return {
        CGs: data,
        isLoading,
        isError: error,
    }
}


export function useAttendances(cg_id) {
    const { data, error, isLoading } = useSWR(`${host}/attendance/cg/${cg_id}`, fetcher)

    return {
        attendances: data,
        isLoading,
        isError: error,
    }
}

export async function checkDuplicate(date, cg_id){
    if (!date) return false;
    date = date.replaceAll('/','+');

    const response = await fetch(`${host}/attendance/check/${date}/${cg_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.status === true;
}

export async function addAttend(attendData){
    const response = await fetch(`${host}/attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendData)
    });
    const data = await response.json();
    return data;
}