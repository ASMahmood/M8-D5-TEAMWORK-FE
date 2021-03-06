import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron, Button, Row, Col, Container, Image } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  nowPlaying: (song, img) =>
    dispatch({ type: "NOW_PLAYING", payload: { song, img } }),
  fetchTrackswithThunk: (id) =>
    dispatch(async (dispatch) => {
      const url = "http://localhost:3003/deezer/artists/";
      const response = await fetch(url + id + "/toptracks", {
        credentials: "include",
      });

      const tracks = await response.json();
      // console.log("tracks:", tracks.data);

      if (response.ok) {
        dispatch({
          type: "SET_TOP_ALBUMS",
          payload: tracks,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: tracks,
        });
      }
    }),

  fetchAlbumswithThunk: (id) =>
    dispatch(async (dispatch) => {
      const url = "http://localhost:3003/deezer/artists/";
      const response = await fetch(url + id + "/albums", {
        credentials: "include",
      });

      const albums = await response.json();
      console.log("albums:", albums.data);

      if (response.ok) {
        dispatch({
          type: "POPULATE_ALBUMS",
          payload: albums,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: albums,
        });
      }
    }),

  fetchArtistwithThunk: (id) =>
    dispatch(async (dispatch) => {
      const url = "http://localhost:3003/deezer/artists/";
      const response = await fetch(url + id + "/profile", {
        credentials: "include",
      });

      const artist = await response.json();
      console.log("artist:", artist);

      if (response.ok) {
        dispatch({
          type: "SET_ARTIST",
          payload: artist,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: artist,
        });
      }
    }),
});

class artistPage extends React.Component {
  state = {
    show: 10,
  };

  async componentDidMount() {
    this.props.fetchArtistwithThunk(this.props.match.params.id);
    this.props.fetchTrackswithThunk(this.props.match.params.id);
    this.props.fetchAlbumswithThunk(this.props.match.params.id);
  }
  render() {
    const { artist, tracks } = this.props.ui;

    return (
      <>
        <div className="mb-5 min-vw-100" style={{ paddingLeft: "20%" }}>
          <div className=" min-vw-100 vh-20">
            <img
              style={{ objectFit: "contain" }}
              src={artist.picture_medium}
              alt=""
            />
          </div>

          <h1
            style={{ fontSize: "75px", color: "white", marginBottom: "30px" }}
          >
            {" "}
            {artist.name}
          </h1>
          <FaPlayCircle style={{ color: "green", fontSize: "40px" }} />
          <AiOutlineHeart style={{ color: "white", fontSize: "40px" }} />

          <Row className="mt-5 mb-5">
            <Col md={7}>
              <div className="tracklist pr-3 p-1 ">
                <h5 style={{ color: "white", marginBottom: 30 }}>Popular</h5>

                {tracks.slice(0, this.state.show).map((track) => (
                  <div
                    className="d-flex track"
                    onClick={() =>
                      this.props.nowPlaying(track, track.album.cover_small)
                    }
                  >
                    <Image
                      className="artist-song-cover"
                      src={track.album.cover_small}
                      alt=""
                    />

                    <p className="ml-2">{track.title_short}</p>
                    <p className="subtitle ml-2">{track.rank}</p>
                    <div className=" ml-auto">
                      <p className="align-self-start fas fa-music d-inline ">
                        <AiOutlineHeart
                          style={{ color: "gray", fontSize: "16px" }}
                        />
                      </p>
                      <p className="d-inline subtitle ml-3">{track.duration}</p>
                    </div>
                  </div>
                ))}
                <a
                  className="btn-sidebar"
                  onClick={() =>
                    this.state.show === "10"
                      ? this.setState({ show: "15" })
                      : this.setState({ show: "10" })
                  }
                >
                  {this.state.show === "10" ? (
                    <p>See More</p>
                  ) : (
                    <p>See less </p>
                  )}{" "}
                </a>
              </div>
            </Col>
            <Col md={5}>
              <h5 style={{ color: "white", marginBottom: 30 }}>Albums</h5>
              {this.props.ui.albums.length > 0 &&
                this.props.ui.albums
                  .slice(0, this.state.show)
                  .map((album, index) => (
                    <Link
                      to={`/album/${album.id}`}
                      style={{ textDecoration: "none", color: "lightgrey" }}
                    >
                      <div key={index} className="d-flex">
                        <Image
                          className="artist-song-cover d-inline"
                          src={album.cover_small}
                          alt=""
                        />

                        <div className=" ml-5 d-inline">
                          <p className=" subtitle ">{album.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(artistPage);
