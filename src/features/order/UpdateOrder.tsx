import { ActionFunction, useFetcher } from "react-router-dom"
import Button from "../../ui/Button"
import { updateOrder, UpdateType } from "../../services/apiRestaurant"



const UpdateOrder = () => {
    const fetcher=useFetcher()
  return (
    <>
      <fetcher.Form method="PATCH" className="text-right">
        <Button type="primary">make priority</Button>
        <input type="hidden" name="priority" value={String(true)} />
      </fetcher.Form>
    </>
  );
}

export const action:ActionFunction=async({request,params})=>{
    // const update:UpdateType={priority:true}
    const data=await request.formData()
    const obj = Object.fromEntries(data);
    
    
    
   
    
    
    const update:UpdateType={priority:Boolean(obj.priority)}
    
  
    
    
    await updateOrder(Number(params.orderId),update)
    

    return null
    

}

export default UpdateOrder