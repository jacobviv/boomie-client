import { useContext, useEffect } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const BattleCard = ({ name, bookID, movieID, _id, owner }) => {


    const { user } = useContext(AuthContext)

    return (
        <Card className='mb-3'>
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

            <ButtonGroup style={{ width: '100%' }}>
                <Link to={`/battles/edit/${_id}`}>
                    {user && user._id === owner && < Button variant='warning' size='sm'>Edit</Button>}
                </Link>
            </ButtonGroup>
        </Card >
    )
}

export default BattleCard