import * as React from "react";
import request from "superagent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
//import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "react-image-lightbox/style.css";
//import Filter from "../filter/Filter";
import "./Gallery.scss";

type State = {
  err: string;
  active: boolean;
  photos: PhotoType[] | Mock[];
  showDay: boolean;
  imageOpen: boolean;
  devMode: boolean;
  imageIndex: number;
};

type Props = {
  match: any;
};

interface PhotoType {
  _id: String;
  date: String;
  tags: [String];
  video: String;
  image: String;
  day: Number;
  comment?: String;
  displayDay?: String;
}

interface Mock {
  _id: String;
  date: String;
  tags: [String];
  video: String;
  image: String;
  day: Number;
  comment: String;
  displayDay: String;
}

const message = [
  {
    message:
      "We must be very dull people to have done nothing at all on this day.",
  },
  {
    message:
      "Sorry, Madeleine, Buster, Ravid, Arnie, Michael and Loewn can't come to the phone right now. They are busy doing bigger and better things.",
  },
  {
    message:
      "Clearly we were either play Animal Crossing or Mario kart and were to busy to take photos on this day, soz.",
  },
  {
    message: "Madeleine! Why did you not take any photos",
  },
  {
    message: "No, No, Please No Paparazzi",
  },
  {
    message: "On this day we just ate, slept and shat",
  },
];
const mock = [
  {
    _id: "5e9ce2301c9d440000dd0bed",
    date: "2020-04-18T22:26:14.000Z",
    tags: [],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331402/Isolation/isolation-April_18_2020-62_qrzxal.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331402/Isolation/isolation-April_18_2020-62_qrzxal.jpg",
    day: 30,
    comment: "Misty you angel, glowing so bright",
  },
  {
    _id: "5e9ce1fb1c9d440000dd0bec",
    date: "2020-04-18T22:14:01.000Z",
    tags: ["Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331399/Isolation/isolation-April_18_2020-54_yxtcg2.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331399/Isolation/isolation-April_18_2020-54_yxtcg2.jpg",
    day: 30,
  },
  {
    _id: "5e9ce0ee1c9d440000dd0be9",
    date: "2020-04-18T22:12:36.000Z",
    tags: ["Buster", "Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331397/Isolation/isolation-April_18_2020-50_lwlo70.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331397/Isolation/isolation-April_18_2020-50_lwlo70.jpg",
    day: 30,
  },
  {
    _id: "5e9ce1b11c9d440000dd0beb",
    date: "2020-04-18T22:12:36.000Z",
    tags: ["Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331399/Isolation/isolation-April_18_2020-53_tu4nyd.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331399/Isolation/isolation-April_18_2020-53_tu4nyd.jpg",
    day: 30,
  },
  {
    _id: "5e9ce0911c9d440000dd0be8",
    date: "2020-04-18T21:44:51.000Z",
    tags: ["Madeleine"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331397/Isolation/isolation-April_18_2020-48_vecopb.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331397/Isolation/isolation-April_18_2020-48_vecopb.jpg",
    day: 30,
  },
  {
    _id: "5e9ce0351c9d440000dd0be7",
    date: "2020-04-18T21:44:32.000Z",
    tags: ["Zach"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331397/Isolation/isolation-April_18_2020-47_kfm40z.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331397/Isolation/isolation-April_18_2020-47_kfm40z.jpg",
    day: 30,
  },
  {
    _id: "5e9cdf041c9d440000dd0be5",
    date: "2020-04-18T21:42:30.000Z",
    tags: ["Madeleine"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331394/Isolation/isolation-April_18_2020-43_s3yebj.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331394/Isolation/isolation-April_18_2020-43_s3yebj.jpg",
    day: 30,
  },
  {
    _id: "5e9cdff61c9d440000dd0be6",
    date: "2020-04-18T21:42:30.000Z",
    tags: ["Madeleine"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331395/Isolation/isolation-April_18_2020-45_wo08gz.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331395/Isolation/isolation-April_18_2020-45_wo08gz.jpg",
    day: 30,
  },
  {
    _id: "5e9cde9c1c9d440000dd0be4",
    date: "2020-04-18T21:40:10.000Z",
    tags: ["Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331393/Isolation/isolation-April_18_2020-40_cw6vl2.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331393/Isolation/isolation-April_18_2020-40_cw6vl2.jpg",
    day: 30,
  },
  {
    _id: "5e9cde511c9d440000dd0be3",
    date: "2020-04-18T21:39:55.000Z",
    tags: ["Zach"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331393/Isolation/isolation-April_18_2020-39_sztuou.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331393/Isolation/isolation-April_18_2020-39_sztuou.jpg",
    day: 30,
    comment: "Posh Zach",
  },
  {
    _id: "5e9cde081c9d440000dd0be2",
    date: "2020-04-18T21:39:36.000Z",
    tags: ["Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331393/Isolation/isolation-April_18_2020-38_rixwfr.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331393/Isolation/isolation-April_18_2020-38_rixwfr.jpg",
    day: 30,
    comment: "Buster Moves",
  },
  {
    _id: "5e9cddaf1c9d440000dd0be1",
    date: "2020-04-18T20:51:42.000Z",
    tags: ["Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331390/Isolation/isolation-April_18_2020-33_d0q9q6.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331390/Isolation/isolation-April_18_2020-33_d0q9q6.jpg",
    day: 30,
  },
  {
    _id: "5e9cdd791c9d440000dd0be0",
    date: "2020-04-18T20:15:45.000Z",
    tags: ["Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331386/Isolation/isolation-April_18_2020-30_fp5533.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331386/Isolation/isolation-April_18_2020-30_fp5533.jpg",
    day: 30,
  },
  {
    _id: "5e9ce1331c9d440000dd0bea",
    date: "2020-04-18T20:15:45.000Z",
    tags: ["Arnie", "Michael", "Zach", "Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331397/Isolation/isolation-April_18_2020-51_fwrfgg.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331397/Isolation/isolation-April_18_2020-51_fwrfgg.jpg",
    day: 30,
    comment: "Charades",
  },
  {
    _id: "5e9ce2791c9d440000dd0bef",
    date: "2020-04-18T20:15:45.000Z",
    tags: ["Arnie", "Michael", "Zach", "Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331397/Isolation/isolation-April_18_2020-51_fwrfgg.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331397/Isolation/isolation-April_18_2020-51_fwrfgg.jpg",
    day: 30,
    comment: "Night, Night.",
    displayDay: "30",
  },
  {
    _id: "5e9cdd341c9d440000dd0bdf",
    date: "2020-04-18T20:13:56.000Z",
    tags: ["Zach"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331387/Isolation/isolation-April_18_2020-28_udpguv.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331387/Isolation/isolation-April_18_2020-28_udpguv.jpg",
    day: 30,
  },
  {
    _id: "5e9cdcfe1c9d440000dd0bde",
    date: "2020-04-18T20:13:45.000Z",
    tags: ["Michael", "Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331385/Isolation/isolation-April_18_2020-27_lkwvpo.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331385/Isolation/isolation-April_18_2020-27_lkwvpo.jpg",
    day: 30,
  },
  {
    _id: "5e9cdcb11c9d440000dd0bdd",
    date: "2020-04-18T20:13:38.000Z",
    tags: ["Arnie", "Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331387/Isolation/isolation-April_18_2020-26_hsafp5.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331387/Isolation/isolation-April_18_2020-26_hsafp5.jpg",
    day: 30,
  },
  {
    _id: "5e9cdc791c9d440000dd0bdc",
    date: "2020-04-18T20:08:54.000Z",
    tags: [],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331384/Isolation/isolation-April_18_2020-25_pce1sx.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331384/Isolation/isolation-April_18_2020-25_pce1sx.jpg",
    day: 30,
  },
  {
    _id: "5e9cdc271c9d440000dd0bdb",
    date: "2020-04-18T20:08:47.000Z",
    tags: ["Michael"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331381/Isolation/isolation-April_18_2020-24_rqxjfi.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331381/Isolation/isolation-April_18_2020-24_rqxjfi.jpg",
    day: 30,
  },
  {
    _id: "5e9cdb851c9d440000dd0bd9",
    date: "2020-04-18T20:08:41.000Z",
    tags: ["Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331379/Isolation/isolation-April_18_2020-22_fayutc.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331379/Isolation/isolation-April_18_2020-22_fayutc.jpg",
    day: 30,
  },
  {
    _id: "5e9cdbca1c9d440000dd0bda",
    date: "2020-04-18T20:08:41.000Z",
    tags: ["Zach"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331380/Isolation/isolation-April_18_2020-23_kn9qqw.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331380/Isolation/isolation-April_18_2020-23_kn9qqw.jpg",
    day: 30,
  },
  {
    _id: "5e9cdb231c9d440000dd0bd8",
    date: "2020-04-18T20:08:37.000Z",
    tags: ["Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331379/Isolation/isolation-April_18_2020-21_sxtzir.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331379/Isolation/isolation-April_18_2020-21_sxtzir.jpg",
    day: 30,
    comment: "Fancy Dinner Night",
  },
  {
    _id: "5e9cd9dc1c9d440000dd0bd7",
    date: "2020-04-18T14:43:27.000Z",
    tags: ["Arnie", "Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331380/Isolation/isolation-April_18_2020-17_ojzfom.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331380/Isolation/isolation-April_18_2020-17_ojzfom.jpg",
    day: 30,
  },
  {
    _id: "5e9cd9191c9d440000dd0bd6",
    date: "2020-04-18T14:17:14.000Z",
    tags: ["Madeleine", "Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331375/Isolation/isolation-April_18_2020-16_e6wsjf.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331375/Isolation/isolation-April_18_2020-16_e6wsjf.jpg",
    day: 30,
  },
  {
    _id: "5e9cd8c11c9d440000dd0bd5",
    date: "2020-04-18T14:13:08.000Z",
    tags: ["Ravid", "Arnie"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331372/Isolation/isolation-April_18_2020-14_mw39k2.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331372/Isolation/isolation-April_18_2020-14_mw39k2.jpg",
    day: 30,
  },
  {
    _id: "5e9cd8461c9d440000dd0bd4",
    date: "2020-04-18T14:10:44.000Z",
    tags: ["Madeleine", "Buster"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331372/Isolation/isolation-April_18_2020-12_cxewpd.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331372/Isolation/isolation-April_18_2020-12_cxewpd.jpg",
    day: 30,
  },
  {
    _id: "5e9cd7f51c9d440000dd0bd3",
    date: "2020-04-18T14:04:21.000Z",
    tags: ["Ravid"],
    image:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_100/v1587331372/Isolation/isolation-April_18_2020-11_ynw2jx.jpg",
    imageLow:
      "https://res.cloudinary.com/isolationstables/image/upload/h_400,c_scale/q_auto:good/v1587331372/Isolation/isolation-April_18_2020-11_ynw2jx.jpg",
    day: 30,
  },
];
class Gallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false,
      photos: [],
      err: "",
      showDay: true,
      imageOpen: false,
      devMode: false,
      imageIndex: 0,
    };
  }

  componentDidMount() {
    const dayNumber = parseInt(this.props.match.params.day);
    if (dayNumber > 0) {
      request.get(`/api/v1/days/${dayNumber}`).then((res) => {
        this.setState({
          photos: res.body.value,
          showDay: false,
        });
      });
    } else if (this.state.devMode) {
      // remove once app compleant. just fr dev mode.
      this.setState({
        photos: mock,
      });
    } else {
      request.get(`/api/v1`).then((res) => {
        this.setState({
          photos: res.body.value,
        });
      });
    }
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    const { photos, imageIndex, imageOpen } = this.state;
    return (
      <div className="gallery-body">
        {/* active when working. */}
        {/* <button className="filter" onClick={this.toggleClass}>
          <p className="filter-text">filter</p>
        </button> */}
        {/* {this.state.active && <Filter />} */}
        <div className="gallery-container">
          <div className="main-day">
            {!this.state.showDay && (
              <h3>{`day ${this.props.match.params.day}`}</h3>
            )}
          </div>
          {photos.length === 0 && (
            <div className="error-message">
              <h3>{message[Math.round(Math.random() * 3)].message}</h3>
            </div>
          )}
          {photos.map((photo, i: number) => {
            return (
              <div key={i} className="gallery-item">
                <LazyLoadImage
                  placeholderSrc="https://res.cloudinary.com/isolationstables/image/upload/v1587088566/Isolation/misty/Misty-loading_et5ijk.jpg"
                  src={`${photo.imageLow}`}
                  alt="placeholder"
                  onClick={() =>
                    this.setState({ imageOpen: true, imageIndex: i })
                  }
                />

                {/* Todo get videos rendering */}
                {/* {photo.video && (
                  <Player
                    playsInline
                    poster={`${photo.placeholder}`}
                    src={`${photo.video}`}
                  />
                )} */}
                <div className="comment">
                  {this.state.showDay && photo.displayDay && (
                    <p className="day">day {photo.displayDay}</p>
                  )}
                  <p className="day-comment">{photo.comment}</p>
                </div>
              </div>
            );
          })}
          {imageOpen && (
            <Lightbox
              imageLoadErrorMessage={
                "I'm either loading or I've failed to load"
              }
              mainSrc={`${photos[imageIndex].image}`}
              onCloseRequest={() => this.setState({ imageOpen: false })}
              nextSrc={`${photos[(imageIndex + 1) % photos.length]}`}
              prevSrc={`${
                photos[(imageIndex + photos.length - 1) % photos.length]
              }`}
              onMovePrevRequest={() =>
                this.setState({
                  imageIndex: (imageIndex + photos.length - 1) % photos.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  imageIndex: (imageIndex + 1) % photos.length,
                })
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Gallery;
