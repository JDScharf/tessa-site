import BritishCaribbeanMap from "../components/BritishCaribbeanMap";

function Geography() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="main-title">Geography</h1>

          <div className="dataviz">{/* ArcGIS Map */}</div>
          {/* text below */}
          <BritishCaribbeanMap />
          <div className="text-below-viz">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              condimentum auctor purus at malesuada. Cras vulputate purus augue,
              vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet
              lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum
              quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum
              vestibulum fringilla.
            </p>
            <br></br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              condimentum auctor purus at malesuada. Cras vulputate purus augue,
              vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet
              lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum
              quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum
              vestibulum fringilla.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Geography;
