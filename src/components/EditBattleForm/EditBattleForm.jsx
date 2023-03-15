import { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import battlesService from "../../services/battles.services"
import { ThemeContext } from "../../contexts/theme.context"
import { useNavigate, useParams } from "react-router-dom"

const EditBattleForm = ({ battle }) => {

    const { battle_id } = useParams()
    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)


    const [battleData, setBattleData] = useState({
        name: battle.name,
        bookID: battle.bookID,
        movieID: battle.movieID,
    })

    const handleBattleChange = e => {
        const { name, value } = e.target
        setBattleData({ ...battleData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        battlesService
            .editBattleById(battle_id, { ...battleData })
            .then(() => {
                navigate('/battles')
            })
            .catch(err => console.log(err))
    }


    return (

        <Form className="mb-5" onSubmit={handleSubmit} >

            <Form.Group className="mb-3" controlId="name" >
                <Form.Label>Name:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="name" value={battleData.name} onChange={handleBattleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bookID" >
                <Form.Label>bookID:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="bookID" value={battleData.bookID} onChange={handleBattleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="movieID">
                <Form.Label>movieID:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="movieID" value={battleData.movieID} onChange={handleBattleChange} required />
            </Form.Group>

            <div className="d-grid ">
                <Button type="submit" variant="warning" className="mx-4 mt-3">Save Changes</Button>
            </div>

        </Form>
    )
}

export default EditBattleForm