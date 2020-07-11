import React from "react";
import { Container, Button, Alert, Card} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/artist/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./Artist.css";
import AuthContext from "../../configs/authContext";




export default class ArtistListPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
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
    if (this.props.location.pathname === "/artist/list")
      services.artist
        .getAll(searchText)
        .then((value) => this.setState({ artists: value }))
        .catch((err) => this.setState({ error: err }));
  }

  render() {

    const { artists, error, toCreate } = this.state;
    const { user } = this.context;

    return (
      <Container>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}

        <div className="buttons-container">
          {user && <Button
            variant="outline-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => this.setState({ toCreate: true })}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add new artist
          </Button>}
          {<SearchFormComponent
            search={(text) => this.getList(text)} />} 
        </div>

        <SubmitDialogComponent
          show={toCreate}
          handleClose={() => this.setState({ toCreate: false })}
          submited={(createdArtist) => this.setState({ artists: [...artists, createdArtist], toCreate: false })}
        />

        <div id="artistList">
          {artists.map((artist, index) => (
            <Card key={`artist${index}`}>
              <Card.Img variant="top" src={artist.photo} onClick={() => this.props.history.push(`/artist/details/${artist._id}`)} />
              <Card.Body>
                <Card.Title>Artista : {artist.artistname}</Card.Title>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.history.push(`/artist/details/${artist._id}`)}>
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