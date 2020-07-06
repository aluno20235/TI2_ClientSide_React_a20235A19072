import React from "react";
import { Container, Button, Table, Alert, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/album/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./Album.css";

export default class AlbumListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albuns: [],
      error: undefined,
      toCreate: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getList();
    }
  }

  getList(searchText) {
    if (this.props.location.pathname === "/album/list")
      services.album
        .getAll(searchText)
        .then((value) => this.setState({ albuns: value }))
        .catch((err) => this.setState({ error: err }));
  }

  render() {
    
    const { albuns, error, toCreate } = this.state;

    return (
      <Container>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}

        <div className="buttons-container">
          <Button
            variant="outline-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => this.setState({ toCreate: true })}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add new album
          </Button>
          {<SearchFormComponent 
            search={(text) => this.getList(text)} />}
        </div>

        <SubmitDialogComponent
          show={toCreate}
          handleClose={() => this.setState({ toCreate: false })}
          submited={(createdAlbum) => this.setState({ albuns: [...albuns, createdAlbum], toCreate: false })}
        />

        <Table responsive>
          <thead>
            <tr>
              <th>Album</th>
              <th>Artist</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {albuns.map((album, index) => (
              <tr key={`album${index}`}>
                <td>{album.album}</td>
                <td>{album.artist}</td>
                <td style={{ textAlign: "right" }}>
                  <Button
                    variant="outline-primary"
                    onClick={() => this.props.history.push(`/album/details/${album._id}`)}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="grid">
          {albuns.map((album, index) => (
            <Card style={{ width: '18rem' }} key={`album${index}`} className="box">

              <Card.Img variant="top" src="holder.js/100px180" src={album.cover} />
              <Card.Body>
                <Card.Title>{album.album}</Card.Title>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.history.push(`/album/details/${album._id}`)}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    );
  }
}
