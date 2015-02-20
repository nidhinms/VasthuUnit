function Test() {
    console.log("Testing in progress...");
    var unit = new VasthuUnit(79.5);
    if (unit.koal != 1 && unit.viral != 2 && unit.yava != 4) {
        alert("Error in conversion from constructor");
    }
    console.log("Testing complete...");
}