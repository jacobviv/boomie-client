import { Col, Container, Row } from "react-bootstrap"
import NewBattleForm from "../../components/NewBattleForm/NewBattleForm"

const BattleCreatePage = () => {
    return (

        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Create your own Book vs Movie Battle:</h1>
                    <hr />
                    <NewBattleForm />
                </Col>
            </Row>
        </Container>
    )
}

export default BattleCreatePage