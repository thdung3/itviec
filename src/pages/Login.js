import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Navbar, Container, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import loginMiddleware from '../action/authAction'

export default function Login() {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const login = (e) => {
        e.preventDefault();
        let user = { email: email, password: password }
        dispatch(loginMiddleware(user))
    }
    if (user.isAuthenticated == true) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <Navbar className="nav-background">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
                            width="108"
                            height="42"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="login-area">
                {/* <Form onSubmit={(e) => login(e)}>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={(e) => login(e)}>Submit</button>
                </Form> */}
                <div className="login-background">
                    <h1>LOGIN</h1>
                    <Form className="w-100 p-5" onSubmit={(e) => login(e)}>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text> */}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button block variant="danger" type="submit" onClick={(e) => login(e)}>
                            Login
                    </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
