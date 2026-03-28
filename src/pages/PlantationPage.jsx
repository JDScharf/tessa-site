import TableauCropSelectorV2 from "../components/TableauCropSelectorV2";

function PlantationPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-plantation">
          <h1 className="main-title">Types of Plantations</h1>

          <TableauCropSelectorV2 />
        </div>
      </section>

      {/* Third Section */}
    </div>
  );
}

export default PlantationPage;
