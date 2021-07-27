import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./Login.css"
import { Row, Button, Form, Col, Container} from 'react-bootstrap'
import { FirebaseContext } from './FirebaseProvider' 
import googleicon from './googleicon.jpg'


export default function Login() {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const { login } = useContext(FirebaseContext)
    const { signInWithGoogle } = useContext(FirebaseContext)
    const history = useHistory()


    const loginGoogle = () => {
        signInWithGoogle()
            .then(response => history.push("/home"))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
        .then(()=> history.push("/home"))
        .catch(() => alert("Credentials are not recongnized"))
    }

    return (
        <Container className="container--login">
                <Form className="form--login" onSubmit={handleLogin}>
                    
                    <h2>Log in to get shaking</h2>
                    <fieldset>
                    <Form.Group controlId="formBasicEmail" className="mb-2">
                        <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    
                    </fieldset>
              
                        <Row className="link--register">
                            <Col xs={4}>
                            <Button type="submit">
                            Sign in
                            </Button>
                            </Col>
                            <Col xs={5}>
                                <Link to="/register">Register for an account</Link>
                            </Col>
                            <Col xs={3}>
                                <Button className="nobackground"><img src={googleicon} alt="Google Icon" onClick={loginGoogle} width="35" height="35" /></Button>
                            </Col>
                        </Row>
    
                </Form>
        </Container>
    )
}
