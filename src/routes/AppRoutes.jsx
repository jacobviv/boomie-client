import { Route, Routes } from "react-router-dom"
import BattleDetailsPage from "../pages/BattleDetailsPage/BattleDetailsPage"
import BattlesPage from "../pages/BattlesPage/BattlesPage"
import EditBattlePage from "../pages/EditBattlePage/EditBattlePage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import AboutPage from "../pages/AboutPage/AboutPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import BattleCreatePage from "../pages/BattleCreatePage/BattleCreatePage"

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/battles" element={<BattlesPage />} />
            <Route path="/battles/details/:battle_id" element={<BattleDetailsPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/details/:id" element={<ProfilePage />} />
                <Route path="/battles/edit/:battle_id" element={<EditBattlePage />} />
                <Route path="/battles/delete/:battle_id" element={<BattlesPage />} />
                <Route path="/battles/create" element={<BattleCreatePage />} />
            </Route>

            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes