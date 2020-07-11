import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import artistService from "../../services/artist";
import RemoveDialogComponent from "../../components/artist/RemoveDialog";
import SubmitDialogComponent from "../../components/artist/SubmitDialog";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";


export default class ArtistDetailsPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      artist: undefined,
      error: undefined,
      toRemove: false,
      toUpdate: false,
    };
  }

  componentDidMount() {
    artistService
      .getOne(this.props.match.params.id)
      .then((value) => this.setState({ artist: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { artist, error, toRemove, toUpdate } = this.state;
const {user}=this.context;
    return (
      <Container>
        <Button variant="outline-primary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}
        {artist !== undefined ? (
          <div>
            <Jumbotron>
              <Row>
              <Col xs={6} md={4} lg={3}>
                  {artist.photo && <img src={artist.photo} alt={artist.photo} className="imageSize"></img>}
                </Col>
                <Col xs={6} md={8} lg={9}>
                  <h1 className="position">{artist.artistname}</h1>
                  <h5 className="position">{artist.description}</h5>
                  <br />
                  {user && <p>
                    <Button className="position" variant="dark" onClick={() => this.setState({ toUpdate: true })}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    &nbsp;
                    {user.role===roles.Admin && <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>
                    <FontAwesomeIcon icon={faTrash} />
                    </Button>}
                  </p>}
                </Col>
              </Row>
            </Jumbotron>

            <RemoveDialogComponent
              artistId={artist._id}
              show={toRemove}
              handleClose={() => this.setState({ toRemove: false })}
              removed={() => this.props.history.goBack()}
            />
            <SubmitDialogComponent
              artist={artist}
              show={toUpdate}
              handleClose={() => this.setState({ toUpdate: false })}
              submited={(updatedArtist) => this.setState({ artist: updatedArtist, toUpdate: false })}
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