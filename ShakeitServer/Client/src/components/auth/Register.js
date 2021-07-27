import React, { useState, useContext } from "react";
import { Button, Form, Container } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FirebaseContext } from "./FirebaseProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(FirebaseContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Oops.");
    } else {
      const userProfile = { name, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <>
    <Container className="justified-content-center">
    
      
      <Form onSubmit={registerClick}>
              <h3 className="cocktailform-name">Create Shake It Up Account</h3>
              <fieldset>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="User Name" id="name" type="text" onChange={e => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
              </Form.Group>
              
              <Button variant="primary" type="submit">Continue</Button>
            </fieldset>
          </Form>
    

  
      <h3 className="username">Already have an account?</h3>
          <Link to="/login" className="btn btn-block btn-outline-success">Sign in</Link>
       
     
    
    </Container>
  </>
  );
}
