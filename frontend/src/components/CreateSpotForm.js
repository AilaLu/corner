import SpotForm from "../components/Spots/SpotForm";

const CreateSpotForm = () => {
  const spot = {
    understanding: "",
    improvement: "",
  };

  return (
    <div className="components-border">
      <SpotForm spot={spot} formType="Create a new spot" />
    </div>
  );
};

export default CreateSpotForm;
