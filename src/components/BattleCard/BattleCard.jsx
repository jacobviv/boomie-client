import { useContext, useEffect } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import battlesService from "../../services/battles.services"


const BattleCard = ({ name, bookID, movieID, _id, owner }) => {


    const { user } = useContext(AuthContext)

    const handleDelete = () => {
        battlesService
            .deleteBattleById(_id)
            .then(() => {
                window.location = "/battles"
            })
            .catch((err) => console.error(err))
    }

    return (
        <Card className='mb-3 card'>
            {/* <Card.Img variant="top" src={imageUrl} /> */}
            <Card.Body>
                <Link to={`/battles/details/${_id}`}>
                    <Card.Text> {name} </Card.Text>
                </Link>
                <Card.Text>Book: {bookID}</Card.Text>
                <Card.Text>Movie: {movieID}</Card.Text>

                {/* <Link to={`/battles/edit/${_id}`}>
                    <Card.Text>EDIT</Card.Text>
                </Link> */}
            </Card.Body>

            {/* <ButtonGroup style={{ width: '100%' }}> */}
            {
                user && user._id === owner &&
                <>
                    <Link to={`/battles/edit/${_id}`}>
                        <Button style={{ width: '100%' }} variant='warning mb-3' size='sm'>Owner's edit</Button>
                    </Link>
                    <Button as="figure" variant="danger" onClick={handleDelete} size='sm'>
                        Owner's delete
                    </Button>
                </>
            }
            {/* </ButtonGroup> */}
        </Card >
    )
}

export default BattleCard