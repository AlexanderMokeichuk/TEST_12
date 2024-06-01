import Layout from "./UI/components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./UI/components/NotFound/NotFound.tsx";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import Gallery from "./features/Gallery/Gallery.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Gallery />)}/>
        <Route path={"/register"} element={(<Register />)} />
        <Route path={"/login"} element={(<Login />)} />
        <Route path={"*"} element={(<NotFound/>)}/>
      </Routes>
    </Layout>
  );
}

export default App;
