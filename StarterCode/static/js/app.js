// Get the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
let data = d3.json(url).then(function(data) {
    console.log(data);});


function init() {

    let dropdown = d3.select('#selDataset');

    d3.json(url).then(function(data) {
        let NAMES = data.names;
        NAMES.forEach((n) => {
            dropdown.append('option').text(n).property('value',n);
        });

        let first = NAMES[0];
        plot1(first);
        plot2(first);
    })
}

function change(option) {plot1(option);plot2(option)};

function plot1(dem) {
    d3.json(url).then(function (data) {
        let METADATA = data.metadata;
        let ARRAY = METADATA.filter(e => e.id==dem);
        let RESULT = ARRAY[0];
        let SHOW = d3.select('#sample-metadata');
        SHOW.html('');
        Object.entries(RESULT).forEach(([k,v]) => {SHOW.append('h6').text(`${k.toUpperCase()}:${v}`);});
    })};

function plot2(dem) {
    d3.json(url).then(function (data) {
        let SAMPLES = data.samples;
        let ARRAY = SAMPLES.filter(e => e.id==dem);
        let RESULT = ARRAY[0];
        let SHOW = d3.select('#sample-metadata');
        let LABELS = RESULT.otu_labels.slice(0,10).reverse();
        let ID = RESULT.otu_ids;
        let x = RESULT.sample_values.slice(0,10).reverse();
        let y = ID.map(e => 'OTU' + e).slice(0,10).reverse();
        let trace = {
            x:x,
            y:y,
            type:'bar',
            orientation:'h',
            text: LABELS
        };
        let layout = {
            title:'Top 10 Bacteria Cultures Found'
        };
        Plotly.newPlot('bar',[trace],layout);

        let bblText = RESULT.otu_labels;
        let bbly = RESULT.sample_values;
        let bbltrace = {
            x:ID,
            y:bbly,
            text:bblText,
            mode: 'markers',
            marker: {size: bbly, color: bbly}
        };
        let bbllayout = {
            title: 'Bacteria Culture per Sample',
            xais: {title: 'OTU ID'}
        };
        Plotly.newPlot('bubble',[bbltrace],bbllayout);
    })};

init();
