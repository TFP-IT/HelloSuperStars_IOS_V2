import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../Constants/context"

export const useAxiosPost = (url, data) => {


    const { axiosConfig } = useContext(AuthContext)
    const [resData, setResData] = useState([])
    const [error, setError] = useState(null)
    const [buffer, setBuffer] = useState(true)


    const HandelSubmit = () => {

        axios.post(url, data, axiosConfig).then((res) => {
            console.log(res)
            setBuffer(false)
            if (res.data.status === 200) {
                setResData(res.data)
            }
        }).catch((err) => {
            console.log(err)
            setError(err)
        })
    }

    return { resData, setResData, buffer, error, HandelSubmit }

}

