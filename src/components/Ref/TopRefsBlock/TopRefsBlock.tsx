import { useGetTopRefsQuery } from "@/redux/api/userApi"

export const TopRefsBlock = () => {
    const {data} = useGetTopRefsQuery(null);
  
    return(
        <div className="">
            
        </div>
    )
}