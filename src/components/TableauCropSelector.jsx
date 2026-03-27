import { useEffect, useRef, useState } from "react";

const cropInfo = {
  Sugar: {
    label: "Sugar",
    description:
      "Sugar cane plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
  },
  Coffee: {
    label: "Coffee",
    description:
      "Coffee plantations Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. Nam egestas elementum sem ac tempor. Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.",
  },
  Cotton: {
    label: "Cotton",
    description:
      "Cotton plantations... Nam egestas elementum sem ac tempor. Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla. Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. ",
  },
};

function TableauCropSelector() {
  const [selectedCrop, setSelectedCrop] = useState("Sugar");
  const vizRef = useRef(null);
  const vizRef2 = useRef(null);

  useEffect(() => {
    // Load the Tableau Embedding API v3 script
    const script = document.createElement("script");
    script.src =
      "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
    script.type = "module";
    document.head.appendChild(script);

    return () => document.head.removeChild(script);
  }, []);

  const handleCropChange = async (crop) => {
    setSelectedCrop(crop);
    const viz = vizRef.current;
    console.log("viz:", viz);
    console.log("workbook:", viz?.workbook);
    console.log("activeSheet:", viz?.workbook?.activeSheet);

    if (viz) {
      try {
        const sheet = viz.workbook.activeSheet;

        // Log all filters available on this sheet
        const filters = await sheet.getFiltersAsync();
        console.log("Available filters:", filters);
        filters.forEach((f) => console.log("Filter field name:", f.fieldName));

        await sheet.applyFilterAsync("Crop", [crop], "replace");
      } catch (err) {
        console.log("Filter error:", err);
      }
    }
  };

  return (
    <div>
      {/* Separator */}
      <section className="registry-section">
        <div className="home-title-div spacer-flex">
          <h2>Select Type of Plantation for More Info</h2>
          {/* Dropdown */}
          <select
            id="crop-button"
            value={selectedCrop}
            onChange={(e) => handleCropChange(e.target.value)}
          >
            {Object.entries(cropInfo).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Third Section */}
      <div className="container">
        <div className="page-container">
          <div className="content-grid">
            {/* First Viz - Tableau v3 web component */}
            <div style={{ overflow: "hidden", width: "100%" }}>
              <div
                style={{
                  transform: "scale(0.75)",
                  transformOrigin: "top left",
                  width: "400%",
                }}
              >
                <tableau-viz
                  ref={vizRef}
                  src="https://public.tableau.com/views/TMurphyExShcarf/DBbycroptype"
                  width="100%"
                  height="750px"
                  toolbar="hidden"
                />
              </div>
            </div>

            {/* Right Column Text */}
            <div className="home-top-text">
              {/* Dynamic text based on selection */}
              <p>{cropInfo[selectedCrop].description}</p>
            </div>
          </div>

          <div className="content-grid">
            {/* Left Column Text */}
            <div className="home-bottom-text">
              {/* Dynamic text based on selection */}
              <p>{cropInfo[selectedCrop].description}</p>
            </div>

            {/* Second viz */}
            <div style={{ overflow: "hidden", width: "100%" }}>
              <div
                style={{
                  transform: "scale(0.75)",
                  transformOrigin: "top left",
                  width: "133%",
                }}
              >
                <tableau-viz
                  ref={vizRef2}
                  src="https://public.tableau.com/views/TMurphyExShcarf/DBbycroptype"
                  width="100%"
                  height="750px"
                  toolbar="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableauCropSelector;
