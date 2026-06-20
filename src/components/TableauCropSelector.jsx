import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const imageFolderpath = "/images/";

const cropInfo = {
  Sugar: {
    label: "Sugar",
    description1:
      "Sugar cane plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
    description2:
      "Second Sugar cane plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
    imgPath: "plantation-sugar.jpg",
    imgInfoLink:
      "https://collections.britishart.yale.edu/catalog/alma:9961695553408651",
    imgSubtitle:
      "Richard Bridgens, “Planting the Sugar Cane,” West India Scenery: with Illustrations of Negro Character, the Process of Making Sugar, &c. From Sketches Taken During a Voyage To, and Residence of Seven Years In, the Island of Trinidad. London: Published for the proprietor by Robert Jennings & Co., 1836.",
  },
  Coffee: {
    label: "Coffee",
    description1:
      "Coffee plantations Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. Nam egestas elementum sem ac tempor. Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.",
    description2:
      "Second coffee plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
    imgPath: "plantation-coffee.jpg",
    imgInfoLink: "https://smarthistory.org/marc-ferrez-slaves-coffee-yard/",
    imgSubtitle:
      "Marc Ferrez, Slaves at a Coffee Yard in a Farm, Vale do Paraiba, Sao Paulo.",
  },
  Cotton: {
    label: "Cotton",
    description1:
      "Cotton plantations... Nam egestas elementum sem ac tempor. Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla. Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. ",
    description2:
      "Second cotton plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
    imgPath: "plantation-cotton.jpg",
    imgInfoLink: "https://artgallery.yale.edu/collections/objects/44742",
    imgSubtitle:
      "James Richard Barfoot, “Progress of Cotton N. 1: Cotton Plantation” (1840).",
  },
  Cacao: {
    label: "Cacao",
    description1:
      "Cacao plantations... Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla. Donec risus erat, imperdiet id efficitur ac, porttitor non ante. Nunc condimentum erat et orci auctor iaculis. Morbi hendrerit eros vitae facilisis egestas. Nam egestas elementum sem ac tempor.  Ut sed nisl a arcu ornare efficitur in nec sapien. Mauris in volutpat libero, sit amet imperdiet ex. Aenean mattis dolor urna, ut efficitur nisi mattis et.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu.  ",
    description2:
      "Second cacao plantations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum auctor purus at malesuada. Cras vulputate purus augue, vel volutpat mauris lobortis eu. Suspendisse ullamcorper laoreet lacinia. Suspendisse at dui a ante auctor fermentum ac condimentum quam. Nullam bibendum justo a efficitur feugiat. Donec vestibulum vestibulum fringilla.",
    imgPath: "plantation-cacao.jpg",
    imgInfoLink: "",
    imgSubtitle: "Detail from Ferdinand Hirts Geographische Bildertafeln,1886.",
  },
};

function TableauCropSelector() {
  // const [allRows, setAllRows] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("Sugar");
  const vizRef = useRef(null);
  const [metricData, setMetricData] = useState(null);
  const [vizReady, setVizready] = useState(false);

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
      viz.addEventListener("firstinteractive", () => {
        setVizready(true);
      });
    }
  }, []);

  const fetchDataForCrop = async (crop) => {
    const viz = vizRef.current;
    if (!viz) return;

    try {
      const dashboard = viz.workbook.activeSheet;
      const sheet = dashboard.worksheets.find(
        (ws) => ws.name === "Number of people, origin (2)",
      );

      // Apply filter first, then wait to update
      await sheet.applyFilterAsync("Crop", [crop], "replace");

      // Small delay to let tableau re-aggregate after filtering
      await new Promise((res) => setTimeout(res, 500));

      const tableData = await sheet.getSummaryDataAsync();
      const rows = tableData.data;

      const total = rows.reduce((sum, row) => sum + (row[1]?._value || 0), 0);
      const african = rows
        .filter((row) => row[0]?._value === "African")
        .reduce((sum, row) => sum + (row[1]?._value || 0), 0);
      const creole = rows
        .filter((row) => row[0]?._value === "Creole")
        .reduce((sum, row) => sum + (row[1]?._value || 0), 0);

      setMetricData({ total, african, creole });
    } catch (err) {
      console.log("Data fetch error:", err);
    }
  };

  // Fetch on initial viz ready
  useEffect(() => {
    if (vizReady) {
      fetchDataForCrop(selectedCrop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vizReady]);

  const handleCropChange = async (crop) => {
    setSelectedCrop(crop);
    setMetricData(null); // show loading spinner while fetching
    await fetchDataForCrop(crop);
  };

  return (
    <div>
      {/* Separator */}
      <section>
        <div id="plantation-selector">
          <h2>Select Type of Plantation for More Information</h2>
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
            <div className="plantation-grid">
              {/* Image Section */}
              <div>
                <img
                  className="plantation-images"
                  src={imageFolderpath + cropInfo[selectedCrop].imgPath}
                  alt={
                    "Historical image of people working on a " +
                    selectedCrop +
                    "plantation."
                  }
                ></img>
                <a
                  id="center-subtitle"
                  href={cropInfo[selectedCrop].imgInfoLink}
                >
                  <i>{cropInfo[selectedCrop].imgSubtitle}</i>
                </a>
              </div>

              {/* Right Column Text */}
              <div className="home-top-text">
                <p>{cropInfo[selectedCrop].description1}</p>
              </div>
            </div>

            <div className="plantation-grid">
              <div className="home-top-text">
                <p>{cropInfo[selectedCrop].description2}</p>
              </div>

              {/* Metric Card */}
              <div>
                {metricData ? (
                  <div id="metric-card">
                    <h3>
                      Total number of people enslaved on{" "}
                      {selectedCrop.toLowerCase()} plantations.
                    </h3>
                    <h2>{metricData.total.toLocaleString()}</h2>
                    <p>Origins</p>
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

              {/* Viz - Currently Commented out.  UNCOMMENT NEXT SECTION TO SHOW */}
              {/* <div style={{ overflow: "hidden", width: "100%", margin: "0px" }}>
                <div
                  style={{
                    transform: "scale(0.75)",
                    transformOrigin: "top left",
                    width: "133%",
                    margin: "0px",
                  }}
                >
                  <tableau-viz
                    ref={vizRef}
                    src="https://public.tableau.com/views/TMurphyExShcarf/DBbycroptype"
                    width="100%"
                    height="500px"
                    toolbar="hidden"
                  />
                </div>
              </div> */}
            </div>

            {/* IF RETURNING THE INTERACTIVE DASHBOARD, change the tableau-viz to be "width="100%", and height to be whatever height you want.  Move it to where the commented out dashboard is, and ten put the text to be in the seciton below.
            For some reason the way that we are rendering the metric card, needs the dashboard data to be pulled for it to display also.*/}
            {/* <div className="home-bottom-text">
              <p>{cropInfo[selectedCrop].description2}</p>
            </div> */}

            <div style={{ overflow: "hidden", width: "100%", margin: "0px" }}>
              <div
                style={{
                  transform: "scale(0.75)",
                  transformOrigin: "top left",
                  width: "133%",
                  margin: "0px",
                }}
              >
                <tableau-viz
                  ref={vizRef}
                  src="https://public.tableau.com/views/TMurphyExShcarf/DBbycroptype"
                  width="0px"
                  height="0px"
                  toolbar="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TableauCropSelector;
