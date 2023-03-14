import { useState } from "react"
import { Form, Col, ListGroup } from "react-bootstrap"
import booksServices from '../../services/books.services'
import Loader from "../Loader/Loader"

const MAX_BOOKS = 10  // max number of preloaded books

const BookSelector = ({ onChange }) => {

    const [searchData, setsearchData] = useState({
        bookTitle: '',
        movieTitle: ''
    })

    const [bookState, setbookState] = useState({
        author_name: '',
        ratings_average: 0,
        title: '',
        first_publish_date: 0,
        excerpt: '',
        key: '',
        saved: false
    })

    const [booksLoading, setBooksLoading] = useState(false)
    const [bookList, setbookList] = useState([])

    const handleInputChange = e => {
        const { value, name } = e.target
        setsearchData({ ...searchData, [name]: value })  // watch out for duplicated keys
    }

    const searchBooks = () => {
        setBooksLoading(true)
        const bookTitle = searchData.bookTitle

        booksServices
            .searchBook(bookTitle)
            .then((result) => {
                setbookList(result.data.docs.slice(0, MAX_BOOKS).filter(b => b.ratings_average > 0))
                setBooksLoading(false)
            })
            .catch(err => console.error(err))
    }

    const selectBook = (selectKey) => {
        const selected = bookList.find(b => b.key === selectKey)
        const { author_name, ratings_average, title, key } = selected

        booksServices
            .loadBook(key)
            .then((fullBook) => {
                const { first_publish_date, excerpts } = fullBook.data
                const bookWithExcerpt = {
                    ...bookState,
                    first_publish_date,
                    excerpt: excerpts?.excerpt ?? '',
                    author_name,
                    ratings_average,
                    title,
                    key,
                    saved: true
                }

                setbookState(bookWithExcerpt)
                onChange(bookWithExcerpt)
            })
            .catch(err => console.error(err))

        setbookList(bookList.map(b => b.key === selectKey ? ({ ...b, selected: true }) : ({ ...b, selected: false })))
    }

    return (
        <Form.Group as={Col} controlId="bookID">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
                type="text"
                name="bookTitle"
                value={searchData.bookTitle}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        searchBooks()
                    }
                }}
                placeholder="Search and press Enter"
            />
            {/* <Button onClick={searchBooks}>🔍</Button> */}
            <hr />
            {
                !booksLoading
                    ?
                    (<ListGroup>
                        {bookList.map((elm, i) => <ListGroup.Item key={i}>{`"${elm.title}" by ${elm.author_name}`}
                            <Form.Check checked={elm.selected ?? false} type="checkbox" onChange={() => selectBook(elm.key)} />
                        </ListGroup.Item>)}
                    </ListGroup>)
                    :
                    <Loader />
            }
        </Form.Group>
    )
}

export default BookSelector