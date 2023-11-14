import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";

export { PrivateRoute };

const PrivateRoute = ({ isAllowed, children }) => {
    const { token } = useSelector((state) => state.auth);
    console.log(token, 'KKOKOKO')
    if(!isAllowed){
        return <Navigate to={'/login'} />
    }

    return token ? children : <Navigate to={'/login'} />
}