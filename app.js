document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const csvData = event.target.result;
        processData(csvData); // Function to parse CSV and prepare data
    };

    reader.readAsText(file);
});

function processData(csvData) {
    // Parse CSV Data and convert to JSON for Vega-Lite
    csvtojson().fromString(csvData).then((jsonData) => {
        const dataForVegaLite = prepareDataForVegaLite(jsonData);
        visualizeData(dataForVegaLite);
    });
}

function prepareDataForVegaLite(jsonData) {
    // Transform jsonData to fit Vega-Lite requirements
    return jsonData; // Placeholder, add transformation logic as needed
}

function visualizeData(data) {
    const spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        description: 'A simple bar chart with embedded data.',
        data: { values: data },
        mark: 'bar',
        encoding: {
            x: {field: 'Category', type: 'ordinal'},
            y: {field: 'Amount', type: 'quantitative'}
        }
    };
    vegaEmbed('#vis', spec);
}
