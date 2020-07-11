import React from "react";
import { Container, Button, Table, Alert, Card, CardGroup, CardDeck, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faIdCard, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/artist/SubmitDialog";
import SearchFormComponent from "../../components/global/SearchForm";
import "./Artist.css";



export default class ArtistListPage extends React.Component {
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

    return (
      <Container>
        {error !== undefined && <Alert variant="danger">{error}</Alert>}

        <div className="buttons-container">
          <Button
            variant="outline-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => this.setState({ toCreate: true })}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add new artist
          </Button>
          {<SearchFormComponent
            search={(text) => this.getList(text)} />} 
        </div>

        <SubmitDialogComponent
          show={toCreate}
          handleClose={() => this.setState({ toCreate: false })}
          submited={(createdArtist) => this.setState({ artists: [...artists, createdArtist], toCreate: false })}
        />

        <Table responsive>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Photo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, index) => (
              <tr key={`artist${index}`}>
                <td>{artist.artistname}</td>
                <td><img src={artist.photo} alt=""></img></td>
                <td style={{ textAlign: "right" }}>
                  <Button
                    variant="outline-primary"
                    onClick={() => this.props.history.push(`/artist/details/${artist._id}`)}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="grid">
        <CardDeck>
              {artists.map((artist, index) => (
            <Card style={{ width: '18rem' }} key={`artist${index}`} className="box">

              <Card.Img variant="top" src="holder.js/100px180" src={artist.photo} />
              <Card.Body>
                <Card.Title>{artist.artistname}</Card.Title>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.history.push(`/artist/details/${artist._id}`)}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </Card.Body>
            </Card>    
            ))}
            </CardDeck>
        </div> 
      </Container>
    );
  }
}