import Alert from 'react-bootstrap/Alert'

const FormError = ({ children }) => {

    return (
        <Alert variant={'dark'} style={{ textAlign: 'center', fontSize: '.8em' }}>
            {children}
        </Alert>
    )
}

export default FormError