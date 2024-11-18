import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRouter = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    if (user) return children
    return <Navigate to="/sign-in" replace={true}/>
}

export default PrivateRouter