import {useContext} from "react"
import {DataContext} from "@/TravelCore/ContextData/Data.tsx";

const useData = () => useContext(DataContext)

export default useData