function checkValidSwap(mechInventory, startPoint, endPoint){
    return getPartMech(mechInventory, startPoint) 
        && getPartMech(mechInventory, endPoint);
}

function checkValidInstall(mechInventory, invSlot, point){
    return mechInventory.inventory[invSlot] 
        && (getPartMech(mechInventory, point) == null);
}

function getPartMech(mechinventory, point){
    var list = traverse(mechinventory);
    console.log(list);
    return list[point];
}

function traverse(node){
    var list = [];
    if(node && node.hardpoints){
        node.hardpoints.forEach((child) => {
            list = [...list, child ,...traverse(child)];
        });
    }
    return list;
}

function getPoint(mechInventory, index){
    return _getPoint(mechInventory, index, -1);
}

function _getPoint(node, index, counter){
    if(node && node.hardpoints){
        var innerIndex = 0;
        for(var child of node.hardpoints){
            counter += 1;
            if(counter == index){
                return [innerIndex];
            }
            var result = _getPoint(child, index, counter);
            if(result != null){
                return [innerIndex, ...result];
            }
            counter += getTotalChildren(child);
            innerIndex += 1;
        }
    }
    return null;
}


function getParent(mechinventory, point){
    return _getParent(mechinventory, point, -1);
}
function _getParent(node, point, counter){
    if(node && node.hardpoints){
        var index = 0;
        for(var child of node.hardpoints){
            counter += 1;
            if(counter == point){
                return {parent:node, slot:index};
            }
            var result = _getParent(child, point, counter);
            if(result != null){
                return result;
            }
            counter += getTotalChildren(child);
            index += 1;
        }
    }
    return null;
}

function getTotalChildren(node){
    var totalChildren = 0;
    if(node && node.hardpoints){
        node.hardpoints.forEach((child)=>{
            totalChildren += 1;
            totalChildren += getTotalChildren(child);
        });
    }
    return totalChildren;
}

export default {
    checkValidInstall,
    checkValidSwap,
    getPartMech,
    getParent,
    getPoint
};