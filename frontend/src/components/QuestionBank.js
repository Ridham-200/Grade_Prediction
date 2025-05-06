import React, { useState } from 'react';
import './QuestionBank.css';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';

const subjects = [
  {
    name: 'Database Management System',
    tagline: 'Crack DBMS like a pro!',
    file: 'dbms.pdf',
  },
  {
    name: 'Machine Learning',
    tagline: 'Ace ML with ease!',
    file: 'ml.pdf',
  },
  {
    name: 'Design and Analysis of Algorithms',
    tagline: 'Unravel DAA mysteries!',
    file: 'daa.pdf',
  },
  {
    name: 'Computer Organization and Architecture',
    tagline: 'Build from circuits to logic!',
    file: 'coa.pdf',
  },
  {
    name: 'Microprocessor and Microcontroller',
    tagline: 'Master bits and bytes!',
    file: 'mpmc.pdf',
  },
  {
    name: 'Economics for Engineers',
    tagline: 'Engineer your economy smartly!',
    file: 'economics.pdf',
  },
];

const QuestionBank = () => {
  const [show, setShow] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleShow = (subject) => {
    setSelectedSubject(subject);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container fluid className="question-bank-container py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="dashboard-title text-center">Question Bank</h1>
          <h4 className="dashboard-subtitle text-center">Download previous year question papers with ease</h4>
        </Col>
      </Row>

      <Row>
        {subjects.map((subject, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4 d-flex">
            <Card className="dashboard-card h-100 w-100" onClick={() => handleShow(subject)}>
              <Card.Header className="bg-primary text-white">
                <h4>{subject.name}</h4>
              </Card.Header>
              <Card.Body>
                <p className="tagline text-muted">{subject.tagline}</p>
                <Button variant="outline-success" className="mt-2">Click to Download</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSubject?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedSubject?.tagline}</p>
          <a
            href={`/downloads/${selectedSubject?.file}`}
            download
            className="btn btn-success"
          >
            Download PDF
          </a>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default QuestionBank;
