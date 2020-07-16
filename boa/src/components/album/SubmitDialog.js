import React from "react";
import { Modal, Button, Form} from "react-bootstrap";
import albumService from "../../services/album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faSave } from "@fortawesome/free-solid-svg-icons";
import genreService from "../../services/genre";
import artistService from "../../services/artist";


export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.album !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { form: this.props.album, cover: null, genres: [], artists: [] }
      : { form: { album: "", genre: 0, year: "", artist: 0 }, cover: null, genres: [], artists: [] };
  }

  componentDidMount() {
    genreService
    .getAll('')
    .then((value) => this.setState({ genres: value }))
    .catch((err) => this.setState({ error: err }));
    artistService
    .getAll('')
    .then((value) => this.setState({ artists: value }))
    .catch((err) => this.setState({ error: err }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const jsonData = (({ album, genre, year, artist }) => ({ album, genre, year, artist }))(
      this.state.form
    );
    if (this.toEdit) {
      const { _id, cover } = this.props.album;
      albumService.update(_id, jsonData).then(() => this.handleCoverSubmit({ ...jsonData, _id, cover }));
    } else {
      albumService.create(jsonData).then((result) => this.handleCoverSubmit({ ...jsonData, _id: result._id }));
    }
  }

  handleCoverSubmit(albumData) {
    if (this.state.cover) {
      albumService.setCover(albumData._id, this.state.cover).then((result) => {
        this.props.submited({ ...albumData, cover: result.url });
      });
    } else {
      this.props.submited(albumData);
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  handleSelectCover(evt) {
    const formData = new FormData();
    formData.append("cover", evt.target.files[0]);
    this.setState({ cover: formData });
  }

  render() {
    const { show } = this.props;
    const { album, genre, year, artist } = this.state.form;

    return (

      <Modal show={show} onHide={this.handleCancel} size="lg">
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit album" : "Create album"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Album</Form.Label>
              <Form.Control
                value={album}
                onChange={(evt) => this.setState({form:{...this.state.form,album: evt.target.value }})} />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                value={genre}
                onChange={(evt) => this.setState({form:{...this.state.form, genre: evt.target.value }})}>
                <option value='0'>Escolhe um género</option>
                {this.state.genres.map((genre) =>
                  <option key={genre._id} value={genre.genre}>{genre.genre}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                value={artist}
                onChange={(evt) => this.setState({form:{...this.state.form,artist: evt.target.value }})}>
                  <option value='0'>Escolhe um artista</option>
                {this.state.artists.map((artist) =>
                  <option key={artist._id} value={artist.artistname}>{artist.artistname}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                value={year}
                pattern="[0-2][0-9][0-9][0-9]"
                onChange={(evt) => this.setState({form:{...this.state.form,year: evt.target.value }})} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                onChange={(evt) => this.handleSelectCover(evt)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              <FontAwesomeIcon icon={faUndo} />
            </Button>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}