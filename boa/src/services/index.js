import albumService from "./album.js";
import artistService from "./artist.js";
import genreService from "./genre.js";
import trackService from "./track.js";
import userService from "./user.js";

export default {
  album: albumService,
  artist: artistService,
  genre: genreService,
  track: trackService,
  user: userService,
};