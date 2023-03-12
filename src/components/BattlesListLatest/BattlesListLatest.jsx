import BattleCard from "../BattleCard/BattleCard"
import { Col, Row } from "react-bootstrap"

const BattlesListLatest = ({ battles }) => {

    const lastFourBattles = battles.slice(-4)

    return (
        <Row>
            {
                lastFourBattles.map(elm => {
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

export default BattlesListLatest