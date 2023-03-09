import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BattleCard = ({ name, bookID, movieID, _id }) => {
    return (
        <Card className='mb-3'>
            {/* <Card.Img variant="top" src={imageUrl} /> */}
            <Card.Body>
                <Card.Text>Book: {bookID}</Card.Text>
                <Card.Text>Movie: {movieID}</Card.Text>
                <Link to={`/battles/details/${_id}`}>
                    <Card.Text>{name}</Card.Text>
                </Link>
                <Link to={`/battles/edit/${_id}`}>
                    <Card.Text>EDIT</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default BattleCard