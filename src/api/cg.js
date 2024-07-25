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