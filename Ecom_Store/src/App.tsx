import Login from "./pages/login"
import Signup from "./pages/signup"
import {Routes ,Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path=
          "/" element={<Signup />
}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        
      </Routes>
    </>
  )
}

export default App
