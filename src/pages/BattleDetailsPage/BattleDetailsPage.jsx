import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import battlesService from "../../services/battles.services"
import { AuthContext } from '../../contexts/auth.context'



const BattleDetailsPage = ({ owner }) => {

    const [battle, setBattle] = useState({
        _id: '',
        name: '',
        bookID: '',
        movieID: '',
        owner: ''
    })
    const { user } = useContext(AuthContext)

    const { battle_id } = useParams()

    console.log(battle_id)

    useEffect(() => {
        battlesService
            .getBattleDetails(battle_id)
            .then(({ data }) => setBattle(data))
            .catch(err => console.error(err))
    }, [])

    const handleDelete = () => {
        battlesService
            .deleteBattleById(battle_id)
            .then(() => {
                window.location = "/battles"
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        console.log("LA BATALLAAAAAAA", battle)
    }, [battle])


    return (

        <Container>

            <h1 className="mb-4">DETAILS FOR: {battle.name}</h1>
            <hr />
            <h2 className="mb-4">BOOK: {battle.bookID}</h2>
            <h2 className="mb-4">MOVIE: {battle.movieID}</h2>
            <hr />
            <h1> <b> BOOK WINS!!</b> </h1>

            <Row>

                <Col md={{ span: 12, offset: 0 }}>
                    <h3>Specs</h3>
                    <ul>
                        <li>Book: {battle.bookID}</li>
                        <li>Movie: {battle.movieID}</li>
                    </ul>
                    <hr />

                    <Link to="/battles">
                        <Button as="figure" variant="dark">Back to Battles</Button>
                    </Link>



                    {
                        user && user._id === owner &&
                        <>
                            <Link to={`/battles/edit/${battle_id}`}>
                                <Button as="figure" variant="warning">Edit Battle</Button>
                            </Link>
                            <Button as="figure" variant="danger" onClick={handleDelete}>
                                Delete Battle
                            </Button>
                        </>
                    }

                </Col>

                <Col md={{ span: 4 }}>
                    <img src={battle.imageUrl} style={{ width: '100%' }} />
                </Col>

            </Row>

        </Container >
    )

}

export default BattleDetailsPage