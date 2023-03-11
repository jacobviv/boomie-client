import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../../components/Loader/Loader"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import { Col, Container, Row } from "react-bootstrap"
import BattlesList from "../../components/BattlesList/BattlesList"
import battlesService from "../../services/battles.services"




const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [battles, setBattles] = useState([])  // array vacío para que el mapeado encuentre algo de inicio
    const [battlesBackUp, setBattlesBackUp] = useState('')


    useEffect(() => {  // hook con callback y fase del efecto (montaje en este caso)
        loadBattles()
    }, [])

    const loadBattles = () => {
        battlesService
            .getBattlesByUser(user._id)
            .then(({ data }) => {
                setBattles(data)
                setBattlesBackUp(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <ProfileCard user={user} className="mt-4" />
            <hr />

            {
                isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <BattlesList battles={battles} />
                    </>
            }
        </Container>
    )
}

export default ProfilePage