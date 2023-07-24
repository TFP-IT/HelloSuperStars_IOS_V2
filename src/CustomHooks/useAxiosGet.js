import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../Constants/context"

export const useAxiosGet = (url) => {


    const { axiosConfig } = useContext(AuthContext)
    const [resData, setResData] = useState([])
    const [error, setError] = useState(null)
    const [buffer, setBuffer] = useState(true)


    useEffect(() => {
        axios.get(url, axiosConfig).then((res) => {
            setBuffer(false)
            setResData(res.data)
            if (res.data.status === 200) {
            }
        }).catch((err) => {
            console.log(err)
            setError(err)
        })
    }, [])

    const HandelGetData = () => {
        axios.get(url, axiosConfig).then((res) => {
            setBuffer(false)
            setResData(res.data)
            if (res.data.status === 200) {
            }
        }).catch((err) => {
            console.log(err)
            setError(err)
        })
    }

    return { resData, setResData, buffer, error, HandelGetData }

}

