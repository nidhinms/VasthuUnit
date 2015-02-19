function Test() {
    console.log("Testing in progress...");
    var unit = new VasthuUnit(96);
    if (unit.koal != 1 && unit.viral != 8 && unit.yava != 3) {
        alert("Error in conversion from constructor");
    }
    console.log("Testing complete...");
}