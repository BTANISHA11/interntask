const productData = {
    "Red": ["64GB", "256GB"],
    "Black": ["64GB", "128GB"],
    "White": ["256GB"]
};

const productIdMap = {
    "Red_64GB": "1001",
    "Black_64GB": "1002",
    "Red_256GB": "1003",
    "Black_128GB": "1004"
};

$(document).ready(function() {
    $("input[name='color']").change(function() {
        const selectedColor = $("input[name='color']:checked").val();
        if (selectedColor) {
            disableUnavailableOptions(selectedColor, "color");
        }
    });

    $("input[name='memory']").change(function() {
        const selectedMemory = $("input[name='memory']:checked").val();
        if (selectedMemory) {
            disableUnavailableOptions(selectedMemory, "memory");
        }
    });
});

function disableUnavailableOptions(selectedOption, type) {
    if (type === "color") {
        const availableMemories = productData[selectedOption];
        $("#memoryButtons label").each(function() {
            const memory = $(this).find("input").val();
            if (availableMemories.includes(memory)) {
                $(this).removeClass("disabled");
                $(this).find("input").prop("disabled", false);
            } else {
                $(this).addClass("disabled");
                $(this).find("input").prop("disabled", true);
            }
        });
    } else if (type === "memory") {
        $("#colorButtons label").each(function() {
            const color = $(this).find("input").val();
            const availableMemories = productData[color];
            if (availableMemories.includes(selectedOption)) {
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
    const selectedColor = $("input[name='color']:checked").val();
    const selectedMemory = $("input[name='memory']:checked").val();
    if (selectedColor && selectedMemory) {
        const productId = productIdMap[`${selectedColor}_${selectedMemory}`];
        alert(`Selected Product ID: ${productId}`);
    } else {
        alert("Please select both color and memory options.");
    }
}
