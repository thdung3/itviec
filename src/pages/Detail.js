import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'
export default function Detail(props) {
    let { id } = useParams()
    const [job, setJob] = useState(null)
    const getData = async () => {
        console.log('Detail.getData')
        let url = `${process.env.REACT_APP_SERVER_URL}/jobs/${id}`
        let response = await fetch(url)
        let data = await response.json()
        setJob(data)
        console.log('detail.data:', data)
    }
    useEffect(() => {
        getData()
    }, [])
    if (job === null) {
        return <h1>loading</h1>
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

            <Container>
                <Row>
                    <Col md={2}>
                        <img src={job.img} />
                    </Col>
                    <Col md={10}>
                        <h4>{job.title}</h4>
                        {job.tags.map(tag => <span className="tag">{tag} {' '}</span>)}
                        <p><i className="fas fa-dollar-sign"></i>{' '}{job.salary}</p>
                        <p><i class="fas fa-map-marker-alt"></i>{' '}{job.city}{' district '}{job.district}</p>
                        <p><i class="fas fa-clock"></i>{' '}<Moment fromNow>{job.time}</Moment></p>
                        <h5>Benefit</h5>
                        <ul style={{ "padding-left": "15px" }}>
                            {job.benefits.map(benefit => <li>{benefit}</li>)}
                        </ul>
                        <h5>Description</h5>
                        <p>{job.description}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
