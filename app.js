let regionSelect = {
    'All': true,
    'Shores Of Plenty': false,
    'Ancient Isles': false,
    'The Wilds': false,
    'Devil\'s Roar': false,
};
let search = null;
let allIslands = [];
let displayIslands = [];

// Tile prime
let tile = document.getElementById('placeholder');
let tileList = tile.parentElement;

start();
function start() {
    for(type in islands) {
        for(region in islands[type]) {
            for(island in islands[type][region]) {
                let payload = islands[type][region][island];
                createIslandTile(payload, island, region, type);
            }
        }
    }
    displayIslands = allIslands;
}

function setDisplayIslands() {
    if(regionSelect.length != 0) {
        //Code
    } else if(search) {
        // Code
    } else {

    }
}
// await function to add by region?

function createIslandTile(payload, name, region, type) {
    let newTile = tile.cloneNode(true);
    let image = payload.MapImg;
    let id = image.slice(15, -4);
    newTile.id = id;
    newTile.classList.add('in-region');
    newTile.classList.add('search');
    newTile.children[0].src = image;
    newTile.querySelector(".island-name").innerHTML = name;
    newTile.querySelector(".island-coor").innerHTML = payload.coor;
    newTile.querySelector(".island-region").innerHTML = `Region: ${region}`;
    newTile.querySelector(".island-type").innerHTML = `Type: ${type}`;
    allIslands.push({id, name, newTile, region});
    tileList.lastChild.after(newTile);
}

//Live Search
let searchBar = document.getElementById('search');
searchBar.addEventListener('input', e => {
    console.log(e)
    search = e.target.value;
    if(search.length > 0) {
        displayIslands = allIslands.filter(island => {
            let matchTerm = island.name + ' ' + island.id;
            return matchTerm.toUpperCase().match(search.toUpperCase());
        })
    } else {
        displayIslands = allIslands;
    }
    for(island of allIslands) {
        island.newTile.classList.remove('search');
    }
    for(island of displayIslands) {
        island.newTile.classList.add('search');
    }
    showIslands();
});

let regionSelectors = [
    document.getElementById('all'),
    document.getElementById('shores'),
    document.getElementById('isles'),
    document.getElementById('wilds'),
    document.getElementById('devil')
];

for(select of regionSelectors) {
    select.parentElement.addEventListener('click', regionFilter);
}

function regionFilter(e) {
    let check = e.target.children[0];
    if(check.id == 'all' && !check.checked){
        regionSelectors[1].parentElement.classList.remove('region_selected');
        regionSelectors[1].checked = false;
        regionSelectors[2].parentElement.classList.remove('region_selected');
        regionSelectors[2].checked = false;
        regionSelectors[3].parentElement.classList.remove('region_selected');
        regionSelectors[3].checked = false;
        regionSelectors[4].parentElement.classList.remove('region_selected');
        regionSelectors[4].checked = false;
        e.target.classList.add('region_selected');
    } else if(check.id != 'all' && !check.checked) {
        regionSelectors[0].parentElement.classList.remove('region_selected');
        regionSelectors[0].checked = false;
        regionSelect['All'] = false;
        e.target.classList.add('region_selected');
    } else if(!check.checked) {
        e.target.classList.add('region_selected');
    } else {
        e.target.classList.remove('region_selected');
    }
    check.checked = !check.checked;
    setRegions(check.id, check.checked);
}

function setRegions(region, value) {
    switch(region) {
        case 'all':
            if(value) {
                regionSelect['All'] = true;
                regionSelect['Shores Of Plenty'] = false;
                regionSelect['Ancient Isles'] = false;
                regionSelect['The Wilds'] = false;
                regionSelect['Devil\'s Roar'] = false;
            } else {
                regionSelect['All'] = false;
                regionSelect['Shores Of Plenty'] = false;
                regionSelect['Ancient Isles'] = false;
                regionSelect['The Wilds'] = false;
                regionSelect['Devil\'s Roar'] = false;
            }
            break;
        case 'shores':
            if(value) {
                regionSelect['Shores Of Plenty'] = true;
            } else {
                regionSelect['Shores Of Plenty'] = false;
            }
            break;
        case 'isles':
            if(value) {
                regionSelect['Ancient Isles'] = true;
            } else {
                regionSelect['Ancient Isles'] = false;
            }
            break;
        case 'wilds':
            if(value) {
                regionSelect['The Wilds'] = true;
            } else {
                regionSelect['The Wilds'] = false;
            }
            break;
        case 'devil':
            if(value) {
                regionSelect['Devil\'s Roar'] = true;
            } else {
                regionSelect['Devil\'s Roar'] = false;
            }
            break;
    };

    displayRegions();
}

function displayRegions() {
    let regions = [];
    for(region in regionSelect) {
        if(regionSelect[region]) {
            regions.push(region);
        }
    }
    for(island of allIslands) {
        if(regions.includes(island.region) || regions.includes('All')) {
            island.newTile.classList.add('in-region');
        } else {
            island.newTile.classList.remove('in-region');
        }
    }
    showIslands();
}

function showIslands() {
    for(island of allIslands) {
        if(island.newTile.classList.contains('search') &&
        island.newTile.classList.contains('in-region')) {
            island.newTile.classList.remove('show_off');
        } else {
            island.newTile.classList.add('show_off');
        }
    }
}