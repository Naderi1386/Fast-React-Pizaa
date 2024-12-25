import { useSelector } from "react-redux"
import { StoreType } from "../../Store"
import { UserType } from "./userSlice"
import { getUserName } from "../card/CartSlice"

const UserName = () => {
  const userState=useSelector<StoreType>(getUserName)
  const {userName}=userState as UserType
  if(userName=='')return null
  return (
    <div className="font-semibold text-sm hidden md:block">{userName}</div>
  )
}

export default UserName