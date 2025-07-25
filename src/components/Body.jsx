import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";


const Body = () => {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store)=> store.user);
    const fetchData = async()=>{
        if(userData)return;
        try{
        const user = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
        dispatch(addUser(user.data));
        }
        catch(error){
            if(error.status === 400){
            navigate("/")
            }
            console.error(error);
        }
    }

    

    useEffect(()=>{
        if(!userData)fetchData();
    },[]);

    

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}

export default Body;