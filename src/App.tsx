import Router from "./TravelCore/Routes"
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </>
  );
}

export default App;