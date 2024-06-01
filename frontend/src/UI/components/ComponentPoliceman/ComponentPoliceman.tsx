import React, {PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../../features/Users/usersSlice";
import {useAppSelector} from "../../../app/hooks";

const ComponentPoliceman: React.FC<PropsWithChildren> = ({children}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  return (
    <div>
      {children}
    </div>
  );
};

export default ComponentPoliceman;