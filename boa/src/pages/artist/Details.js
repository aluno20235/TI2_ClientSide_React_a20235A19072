import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import artistService from "../../services/artist";
import RemoveDialogComponent from "../../components/artist/RemoveDialog";
import SubmitDialogComponent from "../../components/artist/SubmitDialog";

export default class ArtistDetailsPage extends React.Component {
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
                  {artist.photo && <img src={artist.photo} alt={artist.photo}></img>}
                </Col>
                <Col xs={6} md={8} lg={9}>
                  <h1>{artist.artistname}</h1>
                  <h5>{artist._id}</h5>
                  <h5>{artist.description}</h5>
                  <br />
                  <p>
                    <Button variant="dark" onClick={() => this.setState({ toUpdate: true })}>
                      Update
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>
                      Remove
                    </Button>
                  </p>
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