import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Row, Col, Button, Navbar, Table } from 'react-bootstrap'
import './Jobs.css'
import JobCard from '../components/JobCard'
const QUERYSTR_PREFIX = 'q'
const api = process.env.REACT_APP_SERVER_URL


const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

export default function Jobs() {

    let history = useHistory();
    const [jobList, setJobList] = useState([])
    const [originalJobList, setOriginalJobList] = useState([])



    let query = useQuery()
    const [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX))

    const handleSearch = (e) => {
        console.log('handleSearch')
        console.log('e:', e)
        let filteredJobs = originalJobList
        if (e) {
            e.preventDefault()
            history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`)
        }
        console.log('keyword:', keyword)
        if (keyword) {
            filteredJobs = originalJobList.filter(job =>
                job.title.toLowerCase().includes(keyword.toLowerCase())
            )
        }
        setJobList(filteredJobs)
    }
    const getData = async () => {
        try {
            let url = `${api}/jobs`
            let response = await fetch(url)
            let data = await response.json()
            console.log('data:', data)
            setJobList(data)
            setOriginalJobList(data)
        } catch (err) {
            alert(err.message)
        }
    }

    const getDetail = (id) => {
        history.push(`jobs/${id}`)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [originalJobList])

    if (jobList.length === 0) {
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

            <div className="search-area">
                <Container>
                    <Row className="row-search-area">
                        <Col sm={10}>
                            <div id="txt-search-area">
                                <i class="fas fa-search"></i>
                                <input
                                    className="col-sm-11 border-red"
                                    id="txt-search"
                                    type="text"
                                    placeholder="Keyword skill (Java, iOS...), Job Title, Company"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}>
                                </input>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <Button className="col-sm-12 p-3" variant="danger" onClick={(e) => handleSearch(e)}>Search</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="job-list-area">
                <Table hover size="sm">
                    <thead>
                        <h4 style={{ "padding": "20px 0px" }}>{jobList.length} IT jobs in Vietnam for you</h4>
                    </thead>
                    <tbody>
                        {jobList.length > 0 &&
                            jobList.map(job =>
                                <JobCard getDetail={getDetail} job={job} />
                            )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
