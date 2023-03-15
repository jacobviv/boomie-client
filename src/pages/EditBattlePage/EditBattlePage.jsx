import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditBattleForm from "../../components/EditBattleForm/EditBattleForm"
import NewBattleForm from "../../components/NewBattleForm/NewBattleForm"
import { AuthContext } from "../../contexts/auth.context"
import battlesService from "../../services/battles.services"

const EditBattlePage = () => {

    const { battle_id } = useParams()

    const { user } = useContext(AuthContext)

    const [battle, setBattle] = useState({})

    useEffect(() => {
        getBattle()
    }, [battle_id])

    const getBattle = () => {

        battlesService
            .getBattleDetails(battle_id)
            .then(({ data }) => {
                setBattle(data)
            })
            .catch(err => console.log(err))
    }

    if (user?._id === battle.owner?._id || user.role === "ADMIN" || user.role === "USER") {

        // OJO, RETIRAR A USER CUANDO ESTÉ IMPLEMENTADO OWNER

        return (
            <Container>
                <Row>

                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Edit Battle {battle.name}</h1>
                        <hr />
                        {/* <EditBattleForm battle={battle} /> */}
                        <NewBattleForm />
                    </Col>
                </Row>
            </Container>
        )
    } else return <Navigate to="/battles" />



}

export default EditBattlePage