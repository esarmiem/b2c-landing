import {useContext} from "react"
import {OrderContext} from "../ContextData/Order"

const useOrder = () => useContext(OrderContext)

export default useOrder