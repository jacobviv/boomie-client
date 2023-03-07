import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button, Col, Row } from "react-bootstrap"
import BattlesList from "../../components/BattlesList/BattlesList"
import Loader from "../../components/Loader/Loader"
import NewBattleForm from "../../components/NewBattleForm/NewBattleForm"
import SearchBar from "../../components/SearchBar/SearchBar"
import { AuthContext } from "../../contexts/auth.context"
import battlesService from "../../services/battles.services"


const BattlesPage = () => {

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
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <>
                            <h1>ALL BATTLES FOUGHT TILL NOW</h1>
                            <hr />
                            {user && <Button onClick={() => setShowModal(true)} variant="dark" size='sm'>Create new</Button>}
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <SearchBar handleSearchBar={handleSearchBar} />
                                </Col>
                            </Row>
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

export default BattlesPage