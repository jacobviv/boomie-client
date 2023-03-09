import { Route, Routes } from "react-router-dom"
import BattleDetailsPage from "../pages/BattleDetailsPage/BattleDetailsPage"
import BattlesPage from "../pages/BattlesPage/BattlesPage"
import EditBattlePage from "../pages/EditBattlePage/EditBattlePage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<p>USER PROFILE</p>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/battles" element={<BattlesPage />} />
            <Route path="/battles/details/:battle_id" element={<BattleDetailsPage />} />
            <Route path="/battles/edit/:battle_id" element={<EditBattlePage />} />
            <Route path="/battles/delete/:battle_id" element={<BattlesPage />} />
            <Route path="/battles/create" element={<p>BATTLE CREATE</p>} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes