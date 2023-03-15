import BattleCard from "../BattleCard/BattleCard"
import { Col, Row } from "react-bootstrap"

const BattlesList = ({ battles }) => {

    // console.log("QUIENES SON LAS BATTLES", battles)


    return (
        <Row>
            {
                battles.map(elm => {
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