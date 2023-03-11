import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import BattlesList from "../../components/BattlesList/BattlesList"
import Loader from "../../components/Loader/Loader"
import NewBattleForm from "../../components/NewBattleForm/NewBattleForm"
import { AuthContext } from "../../contexts/auth.context"
import battlesService from "../../services/battles.services"


const HomePage = () => {

    const [showModal, setShowModal] = useState(false)
    const [battlesBackUp, setBattlesBackUp] = useState('')

    const [battles, setBattles] = useState([])  // array vacío para que el mapeado encuentre algo de inicio
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(AuthContext)

    useEffect(() => {  // hook con callback y fase del efecto (montaje en este caso)
        loadBattles()
    }, [])

    const loadBattles = () => {
        battlesService
            .getBattles()
            .then(({ data }) => {
                setBattles(data)
                setBattlesBackUp(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        const filteredBattles = battlesBackUp.filter(elm => elm.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBattles(filteredBattles)
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadBattles()
    }

    return (


        <>
            <Container>
                <h1>THIS IS THE BOOMIE APP!</h1>
                <hr />
                <h2> Just another MERN to compare books with their screen adaptations, and viceversa.</h2 >
                {user && <Link to={`/details/${user._id}`}>Go to your Personal Archive</Link>}
                {!user && <Link to="/login">Log in to start creating your very own Book vs Movie Battle</Link>}
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>NEW BATTLE</Modal.Title></Modal.Header>
                <Modal.Body>
                    <NewBattleForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default HomePage