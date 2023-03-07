import { useState } from "react"
import { Form } from "react-bootstrap"
import { useContext } from "react"
// import { ThemeContext } from "../../contexts/theme.context"

const SearchBar = ({ handleSearchBar }) => {

    // const { themeValue } = useContext(ThemeContext)
    const [currentText, setText] = useState()

    return (

        <Form className="d-flex my-4">
            <Form.Control
                // className={`${themeValue} secondary me-2`}
                onChange={handleSearchBar}
                value={currentText}
                type="search"
                placeholder="Search Battle"
                aria-label="Search"
            />
        </Form>
    )
}

export default SearchBar