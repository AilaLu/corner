import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../../store/spots";
import { updateSpotThunk } from "../../../store/spots";
import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  // all the inputs
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  // const [lat, setLat] = useState(spot?.lat);
  // const [lng, setLng] = useState(spot?.lng);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);

  const [previewImage, setPreviewImage] = useState(spot?.previewImage);
  const [image2, setImage2] = useState(spot?.image2);
  const [image3, setImage3] = useState(spot?.image3);
  const [image4, setImage4] = useState(spot?.image4);
  const [image5, setImage5] = useState(spot?.image5);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = { ...spot, country, address, city, state, name, description, price };

    const spotImgArray = [
      {
        url: previewImage,
        preview: true,
      },
      {
        url: image2,
        preview: false,
      },
      {
        url: image3,
        preview: false,
      },
      {
        url: image4,
        preview: false,
      },
      {
        url: image5,
        preview: false,
      },
    ];
    // console.log("1. user input", spot);
    if (formType === "Update spot") {
      const editedSpot = await dispatch(updateSpotThunk(spot, spotImgArray));
      spot = editedSpot;
    } else if (formType === "Create spot") {
      const newSpot = await dispatch(createSpotThunk(spot, spotImgArray));
      console.log("3. back to form", newSpot);
      spot = newSpot;
      console.log(spot);
    }

    if (spot.errors) {
      setErrors(spot.errors);
    } else {
      history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit}>
        <section className="spot-location underline-container">
          <h2>{formType}</h2>
          <h3>Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label htmlFor="country">
            Country:
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <div className="errors">{errors.country}</div>
          <label>
            Street Address:
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="errors">{errors.address}</div>
          <label>
            City:
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <div className="errors">{errors.city}</div>
          <label>
            State:
            <input
              type="text"
              placeholder="STATE"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <div className="errors">{errors.state}</div>
        </section>

        <section className="spot-description underline-container">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label>
            <textarea
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="errors">{errors.description}</div>
        </section>

        <section className="spot-name underline-container">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <label htmlFor="">
            <input
              type="text"
              placeholder="name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="errors">{errors.name}</div>
        </section>

        <section className="spot-price underline-container">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <label>
            <i className="fa-solid fa-dollar-sign"></i>
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div className="errors">{errors.price}</div>
        </section>

        <section className="spot-imgs underline-container">
          <h3>Liven up your spot with photos</h3>
          <p>Liven up your spot with photos</p>
          <label>
            <input
              type="url"
              placeholder="Preview Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </label>
          <div className="errors">{errors.previewImage}</div>

          <label>
            <input
              type="url"
              placeholder="Image URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </label>
          <div className="errors">{errors.image2}</div>
          <label>
            <input
              type="url"
              placeholder="Image URL"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
          </label>
          <div className="errors">{errors.image3}</div>
          <label>
            <input
              type="url"
              placeholder="Image URL"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
            />
          </label>
          <div className="errors">{errors.image4}</div>

          <label>
            <input
              type="url"
              placeholder="Image URL"
              value={image5}
              onChange={(e) => setImage5(e.target.value)}
            />
          </label>
          <div className="errors">{errors.image5}</div>
        </section>

        <div className="buttons-container">
          <button className="red-button center-self" type="submit">
            {formType}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpotForm;
