import React, {Fragment} from 'react';
import { Container,Jumbotron,Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, Media, Row, Col } from 'reactstrap';



  
const LandingPage = () =>



<Fragment>  
<Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
      <Container>
        
                <Row>
                    <Col>
                     <Media>
                        <Media left href="#">
                            <Media object data-src="/Img/LOGO-01 (1).jpg" alt="Generic placeholder image" />
                              </Media>
                              <Media body>
                              <Media heading>
                              Media heading
                            </Media>
                                 Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </Media>
                      </Media>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col sm="4">.col .col-sm-4</Col>
                </Row>
                <Row>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col xs="3">.col-3</Col>
                    <Col xs="auto">.col-auto - variable width content</Col>
                    <Col xs="3">.col-3</Col>
                </Row>
             
            </Container>

   
</Fragment>
  
 

export default LandingPage;
