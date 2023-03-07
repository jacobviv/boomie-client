import BattleCard from "../BattleCard/BattleCard"
import { Col, Row } from "react-bootstrap"

const BattlesList = ({ battles }) => {

    return (
        <Row>
            {
                battles.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm._id}>
                            <BattleCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default BattlesList