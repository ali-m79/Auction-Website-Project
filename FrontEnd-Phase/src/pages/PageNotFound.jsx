import "../Style/NotFoundPageStyle.css";
function PageNotFound() {
  return (
    <div className="not-found-container ">
      <div className="not-found-content">
        <h1 className="not-found-title montserrat-fonts">404 - Not Found</h1>
        <p className="not-found-text montserrat-fonts">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="not-found-suggestion montserrat-fonts">
          You can return to the{" "}
          <a href="/" className="montserrat-fonts">
            home page
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
