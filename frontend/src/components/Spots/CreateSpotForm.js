import SpotForm from "./SpotForm";

const CreateSpotForm = () => {
  let spot = {
    country: "",
    address: "",
    city: "",
    state: "",
    name: "",
    description: "",
    price: "",
  };

  return (
    <div className="components-border">
      <SpotForm spot={spot} formType="Create spot" />
    </div>
  );
};

export default CreateSpotForm;
