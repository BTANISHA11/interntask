const colors = ["Red", "Black", "White"];
const memoryOptions = ["64GB", "128GB", "256GB"];

const products = [
    [1001, "iPhone 64GB Red"],
    [1002, "iPhone 64GB Black"],
    [1003, "iPhone 256GB Red"],
    [1004, "iPhone 128GB Black"]
];

const productCombinations = [
    [1001, 0, 0],  // iPhone 64GB Red
    [1002, 1, 0],  // iPhone 64GB Black
    [1003, 0, 2],  // iPhone 256GB Red
    [1004, 1, 1]   // iPhone 128GB Black
];

$(document).ready(function() {
    $("input[name='color']").change(function() {
        const selectedColor = parseInt($("input[name='color']:checked").val());
        if (!isNaN(selectedColor)) {
            disableUnavailableOptions(selectedColor, "color");
        }
    });

    $("input[name='memory']").change(function() {
        const selectedMemory = parseInt($("input[name='memory']:checked").val());
        if (!isNaN(selectedMemory)) {
            disableUnavailableOptions(selectedMemory, "memory");
        }
    });
});

function disableUnavailableOptions(selectedOption, type) {
    if (type === "color") {
        const availableMemories = productCombinations.filter(product => product[1] === selectedOption).map(product => product[2]);
        $("#memoryButtons label").each(function() {
            const memory = parseInt($(this).find("input").val());
            if (availableMemories.includes(memory)) {
                $(this).removeClass("disabled");
                $(this).find("input").prop("disabled", false);
            } else {
                $(this).addClass("disabled");
                $(this).find("input").prop("disabled", true);
            }
        });
    } else if (type === "memory") {
        const availableColors = productCombinations.filter(product => product[2] === selectedOption).map(product => product[1]);
        $("#colorButtons label").each(function() {
            const color = parseInt($(this).find("input").val());
            if (availableColors.includes(color)) {
                $(this).removeClass("disabled");
                $(this).find("input").prop("disabled", false);
            } else {
                $(this).addClass("disabled");
                $(this).find("input").prop("disabled", true);
            }
        });
    }
}

function submitForm() {
    const selectedColor = parseInt($("input[name='color']:checked").val());
    const selectedMemory = parseInt($("input[name='memory']:checked").val());
    if (!isNaN(selectedColor) && !isNaN(selectedMemory)) {
        const selectedProduct = productCombinations.find(product => product[1] === selectedColor && product[2] === selectedMemory);
        if (selectedProduct) {
            alert(`Selected Product ID: ${selectedProduct[0]}`);
        } else {
            alert("No product found with the selected options.");
        }
    } else {
        alert("Please select both color and memory options.");
    }
}
