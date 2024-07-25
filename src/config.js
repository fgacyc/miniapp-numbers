export const satellite_pastoralTeam = {
    "Kuchai YW": ["Move", "Voice", "Mind", "Force", "Heart"],
    "Kuchai WK": ["GS - Joshua Zone"],
    "Kuchai GS": ["GS - Daniel Yeo Zone", "GS - Ps Jasmine Zone", "GS - Ps Melvin Zone"],
    // "Klang": ["Young Professional"],
    "Serdang": ["Adult", "Young Warrior", "Young Professional"],
    "Kepong": ["Adult", "Young Warrior", "Young Professional"],
    "USJ": ["Young Warrior", "General Service"],
    "Setapak": ["Young Warrior", "Young Professional", "Adult"],
    "SG Long": ["Young Warrior", "Young Professional", "Young Family"],
    "Seremban": ["Young Warrior"],
    "Penang":[],
    "Johor":[]
}


export function getLocations() {
    return Object.keys(satellite_pastoralTeam);
}

export function getPastoralTeams(location) {
    return satellite_pastoralTeam[location];
}