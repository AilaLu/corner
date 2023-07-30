import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../../store/spots";

const SpotForm = ({ spot, formType }) => {
  // all the inputs
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
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

    if (formType === "Update spot") {
      // const editedSpot = await dispatch(updatespot(spot));
      // spot = editedSpot;
    } else if (formType === "Create spot") {
      const newSpot = await dispatch(createSpotThunk(spot));
      spot = newSpot;
    }

    if (spot.errors) {
      setErrors(spot.errors);
    } else {
      history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div>
      {/* <h2>SpotForm</h2> */}
      <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <h3>Where's your place located?</h3>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <div className="errors">{errors.country}</div>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div className="errors">{errors.address}</div>
        <label>
          Street Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <div className="buttons">
          <button type="submit">{formType}</button>
        </div>
      </form>
    </div>
  );
};

export default SpotForm;
