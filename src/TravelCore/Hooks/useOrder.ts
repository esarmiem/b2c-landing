import {useContext} from "react"
import {OrderContext} from "../ContextData/Order.tsx"

const useOrder = () => useContext(OrderContext)

export default useOrder