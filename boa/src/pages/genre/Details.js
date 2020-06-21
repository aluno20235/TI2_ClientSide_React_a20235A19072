import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import genreService from "../../services/genre";
import RemoveDialogComponent from "../../components/genre/RemoveDialog";
import SubmitDialogComponent from "../../components/genre/SubmitDialog";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";

export default class GenreDetailsPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      genre: undefined,
      error: undefined,
      toRemove: false,
      toUpdate: false,
    };
  }

  componentDidMount() {
    genreService
      .getOne(this.props.match.params.id)
      .then((value) => this.setState({ genre: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { genre, error, toRemove, toUpdate } = this.state;
    const { user } = this.context;
    return (
      <Container>
        <Button variant="outline-primary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}
        {genre !== undefined ? (
          <div>
            <Jumbotron>
              <Row>
                <Col xs={6} md={8} lg={9}>
                  <h1>{genre.genre}</h1>
                  <h5>{genre._id}</h5>
                  <h5>{genre.description}</h5>
                  <br />
                  {user && <p>
                    <Button variant="dark" onClick={() => this.setState({ toUpdate: true })}>
                      Update
                    </Button>
                    &nbsp;
                    {user.role===roles.Admin && <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>
                      Remove
                    </Button>}
                  </p>}
                </Col>
              </Row>
            </Jumbotron>

            <RemoveDialogComponent
              genreId={genre._id}
              show={toRemove}
              handleClose={() => this.setState({ toRemove: false })}
              removed={() => this.props.history.goBack()}
            />
            <SubmitDialogComponent
              genre={genre}
              show={toUpdate}
              handleClose={() => this.setState({ toUpdate: false })}
              submited={(updatedGenre) => this.setState({ genre: updatedGenre, toUpdate: false })}
            />
          </div>
        ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
      </Container>
    );
  }
}