import { Route, Routes } from "react-router-dom"

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<p>HOME</p>} />
            <Route path="/profile/:id" element={<p>USER PROFILE</p>} />
            <Route path="/signup" element={<p>USER SIGNUP</p>} />
            <Route path="/login" element={<p>USER LOGIN</p>} />
            <Route path="/battles" element={<p>BATTLES</p>} />
            <Route path="/battles/details/:id" element={<p>BATTLE DETAILS</p>} />
            <Route path="/battles/edit/:id" element={<p>BATTLE EDIT</p>} />
            <Route path="/battles/create" element={<p>BATTLE CREATE</p>} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes