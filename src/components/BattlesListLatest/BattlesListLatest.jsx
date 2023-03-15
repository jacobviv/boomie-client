import BattleCard from "../BattleCard/BattleCard"
import { Col, Row } from "react-bootstrap"

const BattlesListLatest = ({ battles }) => {

    const lastFourBattles = battles.slice(-4)

    return (
        <Row>
            {
                lastFourBattles.map(elm => {
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

export default BattlesListLatest