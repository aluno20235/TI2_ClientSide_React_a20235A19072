import React from "react";
import { Container, Button, Col, Row, Jumbotron, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import albumService from "../../services/album";
import RemoveDialogComponent from "../../components/album/RemoveDialog";
import SubmitDialogComponent from "../../components/album/SubmitDialog";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";

export default class AlbumDetailsPage extends React.Component {
  static contextType = AuthContext;
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
    const {user}=this.context;
    return (
      <Container>
        <Button variant="outline-secondary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}
        {album !== undefined ? (
          <div>
            <Jumbotron>
              <Row>
              <Col xs={6} md={4} lg={3}>
                  {album.cover && <img src={album.cover} alt={album.cover} className="coverSize" onClick={() => this.props.history.push(`/album/list`)}></img>}
                </Col>
                <Col xs={6} md={8} lg={9}>
                  <h1 className="textPosition">Album : {album.album}</h1>
                  <h5 className="textPosition">Artista : {album.artist}</h5>
                  <h5 className="textPosition">Ano : {album.year}</h5>
                  <h5 className="textPosition">Género : {album.genre}</h5>
                  <br />
                  {user && <p>
                    <Button className="textPosition" variant="dark" onClick={() => this.setState({ toUpdate: true })}>
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