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

// EXAMPLE OF AN EVENT LISTENER
onClick((event) => {
  element.contains(event.target); // true/false
  // evaluates to true if click happened inside of the element
  // evaluates to false if click happened outside of the element
});

// Let's say you want to render a popup modal text of "Hello World!" when a button with the text of "Greeting" is clicked. You can use the OpenModalButton to create a component which renders this button that triggers this modal.
// The Greeting component will render a button element that, when clicked, will trigger a modal with an h2 element of "Hello World!" and will print "Greeting initiated" to the console logs. When the modal is closed, it will print "Greeting completed" to the console logs.
const Greeting = () => {
  return (
    <OpenModalButton
      buttonText="Greeting"
      modalComponent={<h2>Hello World!</h2>}
      onButtonClick={() => console.log("Greeting initiated")}
      onModalClose={() => console.log("Greeting completed")}
    />
  );
};
