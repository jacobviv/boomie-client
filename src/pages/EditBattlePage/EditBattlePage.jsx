import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditBattleForm from "../../components/EditBattleForm/EditBattleForm"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import battlesService from "../../services/battles.services"

const EditBattlePage = () => {

    const { battle_id } = useParams()

    const { user, isLoading } = useContext(AuthContext)

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
    console.log(battle_id)

    if (isLoading) {
        return <Loader />
    }

    if (user?._id === battle.owner?._id || user.role === "ADMIN" || user.role === "USER") {

        // OJO, RETIRAR A USER CUANDO ESTÉ IMPLEMENTADO OWNER

        return (
            <Container>
                <Row>

                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Edit Battle</h1>
                        <hr />
                        <EditBattleForm />
                    </Col>
                </Row>
            </Container>
        )
    } else return <Navigate to="/battles" />



}

export default EditBattlePage