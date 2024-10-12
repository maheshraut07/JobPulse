import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouter = ({children}) =>{
    const {user} = useSelector(store => store.auth)

    const navigate = useNavigate

    useEffect(() =>{
        if (user === null || user.role !== "recruiter"){
            navigate("/")
        }
    },[])

    return(
        <>
        {children}
        </>
    )
}