import {Grid} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {selectUser} from "../../../features/Users/usersSlice";

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Grid item>
      {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
    </Grid>
  );
};

export default AppToolbar;