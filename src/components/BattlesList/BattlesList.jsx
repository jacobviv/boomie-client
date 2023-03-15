import BattleCard from "../BattleCard/BattleCard"
import { Col, Row } from "react-bootstrap"

const BattlesList = ({ battles, selection }) => {


    const selectedBattles = selection ? battles.slice(-selection) : battles

    return (
        <Row>
            {
                selectedBattles.map(elm => {
                    return (
                        <Col xs={12} sm={12} md={6} lg={4} xl={3} key={elm._id}>
                            <BattleCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default BattlesList