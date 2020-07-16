import React from "react";
import { Container, Button, Table, Alert, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/album/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./Album.css";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";

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
            variant="outline-secondary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => this.setState({ toCreate: true })}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;New Album
          </Button>
          {<SearchFormComponent 
            search={(text) => this.getList(text)} />}
        </div>

        <SubmitDialogComponent
          show={toCreate}
          handleClose={() => this.setState({ toCreate: false })}
          submited={(createdAlbum) => this.setState({ albuns: [...albuns, createdAlbum], toCreate: false })}
        />

        <div id="albumList">
          {albuns.map((album, index) => (
            <Card key={`album${index}`}>
              <Card.Img variant="top" src={album.cover} onClick={() => this.props.history.push(`/album/details/${album._id}`)} />
              <Card.Body>
                <Card.Title >Album : {album.album}</Card.Title>
                <Card.Subtitle >Artista : {album.artist}</Card.Subtitle>
              {/*   <Button
                  variant="outline-primary"
                  onClick={() => this.props.history.push(`/album/details/${album._id}`)}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button> */}
              </Card.Body>
            </Card>))}
            </div>
      </Container>
    );
  }
}
