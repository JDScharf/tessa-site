import TableauOverviewEmbed from "../components/TableauOverviewEmbed";

function Overview() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="main-title">Overview</h1>

          <div className="dataviz">
            {/* Tableau Viz */}
            <TableauOverviewEmbed />
          </div>
          {/* text below */}
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

export default Overview;
