import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './JobCard.css'
import Moment from 'react-moment'

export default function JobCard({ job, getDetail }) {
    return (
        <tr>
            <td className="job-card-area" onClick={() => getDetail(job.id)}>
                <Row>
                    <Col md={2}>
                        <img className="img-company" src={job.img} />
                    </Col>
                    <Col md={8}>
                        <h4>{job.title}</h4>
                        <p><i className="fas fa-dollar-sign"></i>{job.salary}</p>
                        <ul style={{ "padding-left": "15px" }}>
                            {job.benefits.map(benefit => <li>{benefit}</li>)}
                        </ul>
                        {job.tags.map(tag => <span className="tag">{tag} {' '}</span>)}
                    </Col>
                    <Col md={2} className="card-left-area">
                        <label className="txt-hotjob">Hot Job</label>
                        <p className="text-muted">{job.city}</p>
                        <p className="text-muted">District {job.district}</p>
                        <p className="text-muted"><Moment fromNow>{job.time}</Moment></p>
                    </Col>
                </Row>
            </td>
        </tr>
    )
}
