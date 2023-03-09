import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    return (
        <h1>{user.username} Profile Page </h1>
    )
}

export default ProfilePage