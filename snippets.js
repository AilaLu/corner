//how to use font awesome in react component

// To change the size or color of the icon, wrap the <i> element in a parent element like a div. Manipulating the font-size of the parent element changes the size of the icon.
// The color of the parent element will be the color of the icon.
const Carrot = () => {
  return (
    <div style={{ color: "orange", fontSize: "100px" }}>
      <i className="fas fa-carrot"></i>
      <FontAwesomeIcon icon="fa-solid fa-user" />
    </div>
  );
};
