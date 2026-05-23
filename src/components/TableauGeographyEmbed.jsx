import { useEffect, useRef } from "react";

function TableauGeographyEmbed() {
  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    const vizElement = divElement.getElementsByTagName("object")[0];
    console.log("offsetWidth:", divElement.offsetWidth);

    if (divElement.offsetWidth > 800) {
      vizElement.style.width = "1000px";
      vizElement.style.height = "827px";
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = "1000px";
      vizElement.style.height = "827px";
    } else {
      vizElement.style.width = "100%";
      vizElement.style.height = "1377px";
    }

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);

    return () => {
      if (scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div
      className="tableauPlaceholder"
      id="viz1774563824600"
      style={{ position: "relative", width: "100%" }}
      ref={divRef}
    >
      <noscript>
        <a href="https://public.tableau.com/app/profile/tessa.murphy1162/viz/TMurphyExShcarf/Dashboard3">
          <img
            alt="DB by crop type"
            src="https://public.tableau.com/static/images/TM/TMurphyExShcarf/Dashboard3/1_rss.png"
            style={{ border: "none" }}
          />
          View Dashboard
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: "none" }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="TMurphyExShcarf/Dashboard3" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param
          name="static_image"
          value="https://public.tableau.com/static/images/TM/TMurphyExShcarf/Dashboard3/1.png"
        />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  );
}

export default TableauGeographyEmbed;
