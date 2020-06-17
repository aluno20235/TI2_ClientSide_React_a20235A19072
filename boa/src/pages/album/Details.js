import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import albumService from "../../services/album";
import RemoveDialogComponent from "../../components/album/RemoveDialog";
import SubmitDialogComponent from "../../components/album/SubmitDialog";

export default class AlbumDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: undefined,
      error: undefined,
      toRemove: false,
      toUpdate: false,
    };
  }

  componentDidMount() {
    albumService
      .getOne(this.props.match.params.id)
      .then((value) => this.setState({ album: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { album, error, toRemove, toUpdate } = this.state;

    return (
      <Container>
        <Button variant="outline-primary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}
        {album !== undefined ? (
          <div>
            <Jumbotron>
              <Row>
                <Col xs={6} md={8} lg={9}>
                  <h1>{album.album}</h1>
                  <h5>{album.artist}</h5>
                  <h5>{album.year}</h5>
                  <h5>{album.genre}</h5>
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
              albumId={album._id}
              show={toRemove}
              handleClose={() => this.setState({ toRemove: false })}
              removed={() => this.props.history.goBack()}
            />
            <SubmitDialogComponent
              album={album}
              show={toUpdate}
              handleClose={() => this.setState({ toUpdate: false })}
              submited={(updatedAlbum) => this.setState({ album: updatedAlbum, toUpdate: false })}
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