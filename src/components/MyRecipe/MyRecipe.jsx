import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CardComp } from '../Dashboard/Card';
import { getRecipes } from '../../state/DashboardSlice/dashboardSlice';
import axios from 'axios';

const MyRecipe = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] =  useState(true)
    const { token } = useSelector((state) => state.LoginReducer);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
     const getMyRecipes = async()=>{
        const response =await axios.get(`https://different-gold-vulture.cyclic.app/api/getmyrecipe?userId=${localStorage.getItem("userid")}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setData(response?.data?.data)
          setLoading(false)
     }
     getMyRecipes()
    }, [token]);
  
  
  return (
    <div className="text-white py-5">
      {data ? (
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center lg:items-start gap-5 w-[97%] sm:w-[90%] m-auto">
          {data?.map((element, index) => {
            return (
              <div key={index} className="cursor-pointer">
                <Link to={`/recipe/${element._id}`}>
                  <CardComp detail={element} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <>
        {data?(<><Spinner /></>):(<> no data found</>)}
        </>
        
      )}
    </div>
  )
}

export default MyRecipe