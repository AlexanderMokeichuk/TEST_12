import Layout from "./UI/components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./UI/components/NotFound/NotFound.tsx";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import Gallery from "./features/Gallery/Gallery.tsx";
import MyGallery from "./features/Gallery/MyGallery.tsx";
import ComponentPoliceman from "./UI/components/ComponentPoliceman/ComponentPoliceman.tsx";
import AddNewPhoto from "./features/Gallery/components/AddNewPhoto/AddNewPhoto.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Gallery/>)}/>
        <Route path={"/MyGallery"} element={(<MyGallery/>)}/>
        <Route path={"/MyGallery/:id"} element={(<MyGallery/>)}/>
        <Route path={"/new-photo"} element={(
          <ComponentPoliceman>
            <AddNewPhoto/>
          </ComponentPoliceman>)}
        />
        <Route path={"/register"} element={(<Register/>)}/>
        <Route path={"/login"} element={(<Login/>)}/>
        <Route path={"*"} element={(<NotFound/>)}/>
      </Routes>
    </Layout>
  );
}

export default App;
