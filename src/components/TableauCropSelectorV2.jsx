import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  Cacao: {
    label: "Cacao",
    description:
      "Cacao plantations... Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla. Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. Nam egestas elementum sem ac tempor.  Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu.  ",
  },
};

function TableauCropSelectorV2() {
  const [selectedCrop, setSelectedCrop] = useState("Sugar");
  const vizRef = useRef(null);
  const [metricData, setMetricData] = useState(null);
  const [allRows, setAllRows] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
    script.type = "module";
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    const viz = vizRef.current;
    if (viz) {
      viz.addEventListener("firstinteractive", async () => {
        try {
          const dashboard = viz.workbook.activeSheet;
          const cropSheet = dashboard.worksheets.find(
            (ws) => ws.name === "Crop & Race",
          );
          const datasources = await cropSheet.getDataSourcesAsync();
          const datasource = datasources[0];
          const tables = await datasource.getLogicalTablesAsync();
          const tableData = await datasource.getLogicalTableDataAsync(
            tables[0].id,
          );
          console.log("Raw data:", tableData);
          setAllRows(tableData.data);
        } catch (err) {
          console.log("Data fetch error:", err);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!allRows) return;

    const cropRows = allRows.filter((row) => row[5]?._value === selectedCrop);
    const total = cropRows.reduce(
      (sum, row) => sum + (row[41]?._value || 0),
      0,
    );
    const african = cropRows
      .filter((row) => row[22]?._value === "African")
      .reduce((sum, row) => sum + (row[41]?._value || 0), 0);
    const creole = cropRows
      .filter((row) => row[22]?._value === "Creole")
      .reduce((sum, row) => sum + (row[41]?._value || 0), 0);

    console.log("Metrics:", { total, african, creole });
    setMetricData({ total, african, creole });
  }, [selectedCrop, allRows]);

  const handleCropChange = async (crop) => {
    setSelectedCrop(crop);
    const viz = vizRef.current;

    if (viz && viz.workbook?._workbookImpl) {
      try {
        const sheet = viz.workbook.activeSheet;
        await sheet.applyFilterAsync("Crop", [crop], "replace");
      } catch (err) {
        console.log("Filter error:", err);
      }
    }
  };

  return (
    <div>
      {/* Separator */}
      <section>
        <div id="plantation-selector">
          <h2>Select Type of Plantation for More Info</h2>
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

        {/* Third Section */}
        <div className="container">
          <div className="page-container">
            <div className="content-grid">
              {/* Metric Card */}
              <div>
                {metricData ? (
                  <div id="metric-card">
                    <h3>Number of {selectedCrop} Plantations</h3>
                    <h2>{metricData.total.toLocaleString()}</h2>
                    <p>Total Enslaved People</p>
                    <hr />
                    <p>African: {metricData.african.toLocaleString()}</p>
                    <p>Creole: {metricData.creole.toLocaleString()}</p>
                  </div>
                ) : (
                  <div id="metric-card">
                    {" "}
                    <AiOutlineLoading3Quarters
                      style={{
                        animation: "spin 1s linear infinite",
                        fontSize: "2rem",
                      }}
                    />
                    <p>Loading metrics...</p>
                  </div>
                )}
              </div>

              {/* Right Column Text */}
              <div className="home-top-text">
                <p>{cropInfo[selectedCrop].description}</p>
              </div>
            </div>

            <div className="content-grid">
              {/* Left Column Text */}
              <div className="home-bottom-text">
                <p>{cropInfo[selectedCrop].description}</p>
              </div>

              {/* Viz */}
              <div style={{ overflow: "hidden", width: "100%" }}>
                <div
                  style={{
                    transform: "scale(0.75)",
                    transformOrigin: "top left",
                    width: "133%",
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TableauCropSelectorV2;
