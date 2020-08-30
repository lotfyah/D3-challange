// @TODO: YOUR CODE HERE!
const svgWidth = 1100;
const svgHeight = 800;

const margin = {
  top: 40,
  right: 20,
  bottom: 90,
  left: 60
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart 
//and shift the latter by left and top margins
const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
const file = "assets/data/data.csv"

d3.csv(file).then(successHandle);

// Function takes in argument statesData
function successHandle(statesData) {

  // Loop through the data and pass argument data
  statesData.map(function (data) {
    data.poverty = +data.poverty;
    data.obesity = +data.healthcare;
    console.log(data)
  });

  // Create scale functions
  const xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(statesData, d => +d.poverty)])
    .range([0, width]);

  const yLinearScale = d3.scaleLinear()
    .domain([3, d3.max(statesData, d => +d.healthcare)])
    .range([height, 0]);

  /// Create axis functions

  const bottomAxis = d3.axisBottom(xLinearScale);
  const leftAxis = d3.axisLeft(yLinearScale);




  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  chartGroup.append("g")
    .call(leftAxis);


  // Create Circles
  chartGroup.selectAll("circle")
    .data(statesData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "14")
    .classed("stateCircle", true)

  // State abbreviations
  chartGroup.selectAll()
    .data(statesData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("aText", true)
    .text("In Poverty (%)");
}