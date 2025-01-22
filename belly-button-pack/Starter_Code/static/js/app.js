// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {

    // get the metadata field
    console.log(data)
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number

    function sampleGrab (person) {
      // return player.madeTeam == true;
      // A more concise way to express a boolean conditional
      console.log(person.id == sample);
      return person.id == sample;
    }

    // Call the custom function with filter()
    let filteredData = metadata.filter(sampleGrab);

    console.log(filteredData);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredData[0]).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var samples = data.samples;

    // Filter the samples for the object with the desired sample number
    var filteredSample = samples.filter(obj => obj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSample.otu_ids;
    let otu_labels = filteredSample.otu_labels;
    let sample_values = filteredSample.sample_values;

    // Build a Bubble Chart
    const bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      hovermode: 'closest',
      margin: { t: 30 }
    };


    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();


    // Build a Bar Chart
    let barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];

    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      margin: { t: 30, l: 150 }
    };

    

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list
    let firstSample = sampleNames[0];


    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
buildMetadata(`940`);