function checkValidSwap(mechInventory, startPoint, endPoint){
    return getPartMech(mechInventory, startPoint) 
        && getPartMech(mechInventory, endPoint);
}

function checkValidInstall(mechInventory, invSlot, point){
    return mechInventory.inventory[invSlot] 
        && getPartMech(mechInventory, point);
}

function getPartMech(mechinventory, point){
    if(point.length < 1) return null;
    var part = null;
    var parent = mechinventory;
    for(var coord in point){
        var child = parent.hardpoints[coord]; 
        if(child){
            parent = child
        } else {
            return null;
        }
    }
    return parent;
}

export default {
    checkValidInstall,
    checkValidSwap,
    getPartMech
};