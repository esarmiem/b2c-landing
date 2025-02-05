import {useContext} from "react"
import {UserPreferencesContext} from "../ContextData/UserPreferences"

const useUserPreferences = () => useContext(UserPreferencesContext)

export default useUserPreferences