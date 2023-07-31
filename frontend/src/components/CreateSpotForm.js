import SpotForm from "../components/Spots/SpotForm";

const CreateSpotForm = () => {
  const spot = {};

  return (
    <div className="components-border">
      <SpotForm spot={spot} formType="Create spot" />
    </div>
  );
};

export default CreateSpotForm;
