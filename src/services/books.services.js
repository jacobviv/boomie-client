import axios from 'axios'

class BookService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/books`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    searchBook(bookTitle) {
        return this.api.get(`/api/search/${bookTitle}`)
    }

    loadBook(bookKeyRaw) {
        const bookKey = bookKeyRaw.replace('/works/', '')
        return this.api.get(`/api/load/${bookKey}`)
    }

    getBooks() {
        return this.api.get('/getAllBooks')
    }

    getBookByBookID(bookID) {
        return this.api.get(`/getBookByBookID/${bookID}`)
    }

    saveBook(bookData) {
        return this.api.post(`/saveBook/`, bookData)
    }

    detailsByKey(bookKey) {
        return this.api.get(`/detailsByKey/${bookKey}`)
    }

    getBooksRatingSum() {
        // TODO
    }

}

const booksService = new BookService()

export default booksService