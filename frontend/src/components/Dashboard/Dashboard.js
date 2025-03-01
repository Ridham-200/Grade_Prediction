import React, { useState } from 'react';
import './Dashboard.css'; // Custom CSS file
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

const Dashboard = () => {
  // Array of graph information with image paths
  const [show, setShow] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(null);

  // Open modal function
  const handleShow = (graph) => {
    setSelectedGraph(graph);
    setShow(true);
  };

  // Close modal function
  const handleClose = () => setShow(false);
  const graphs = [
    { 
      id: 1, 
      title: 'Grade Distribution', 
      description: 'Overall grade distribution across subjects',
      imgSrc: './images/cgpa_across_subjects.png'  
    },
    { 
      id: 2, 
      title: 'Performance Across Subjects', 
      description: 'Average Performance across all subjects',
      imgSrc: './images/avg_grade_subj.png'
    },
    { 
      id: 3, 
      title: 'Gender Comparison', 
      description: 'Comparison of performance across gender',
      imgSrc: './images/by_gender.png'
    },
    { 
      id: 4, 
      title: 'CGPA Distribution', 
      description: 'Distribution of CGPA across students',
      imgSrc: './images/distribution_cg_students.png'
    },
    { 
      id: 5, 
      title: 'Attendance Impact', 
      description: 'Impact of attendance on CGPA',
      imgSrc: './images/cg_attnd.png'
    },
    { 
      id: 6, 
      title: 'Parent Education Impact', 
      description: 'Impact of Parent education on results',
      imgSrc: './images/parent_edu.png'
    },
    { 
      id: 7, 
      title: 'Credit Hours And Others', 
      description: 'Impact  of Credit Hours and others',
      imgSrc: './images/avg_grade_vsall.png'
    },
  ];

 
    return (
      <Container fluid className="dashboard-container py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title text-center">Analytics Dashboard</h1>
            <h3 className="dashboard-subtitle text-center ">
              Comprehensive visualization of student performance and grade predictions
            </h3>
          </Col>
        </Row>
  
        {/* Grid Layout for 7 Graphs */}
        <Row>
          {graphs.map((graph) => (
            <Col key={graph.id} xs={12} md={6} lg={4} className="mb-4 d-flex">
              <Card className="dashboard-card h-100 w-100" onClick={() => handleShow(graph)}>
                <Card.Header className="bg-secondary text-white">
                  <h4>{graph.title}</h4>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="graph-container">
                    <img src={graph.imgSrc} alt={graph.title} className="graph-image" />
                  </div>
                  <Card.Text className="mt-2">{graph.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
        {/* Modal for Zoomed-in Image */}
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedGraph?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img src={selectedGraph?.imgSrc} alt={selectedGraph?.title} className="modal-img" />
            <p className="mt-3">{selectedGraph?.description}</p>
          </Modal.Body>
        </Modal>
        <Row className="mt-4">
        <Col xs={12}>
          <Card className="dashboard-card summary-card">
            <Card.Header className="bg-info text-white">
              <h3>Dashboard Summary</h3>
            </Card.Header>
            <Card.Body>
              <p>
                This dashboard provides a comprehensive overview of student performance metrics and grade predictions.
                The visualizations help identify trends, areas for improvement, and the effectiveness of the prediction system.
                For detailed analysis of any specific graph, click on the corresponding card.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    );
};

export default Dashboard;