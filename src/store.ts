import { writable } from 'svelte/store';


export const name = writable("Young Entrepreneur");
export const money = writable(70);
money.subscribe((value) => {
    if (value < 0) {
        money.set(0);
    }
})
export const astronaut = writable(5);
astronaut.subscribe((value) => {
    if (value < 0) {
        astronaut.set(0);
    }
})
export const progress = writable({
    transportation: false,
    science: false,
    tour: false,
})

export const capacity = writable(0);
export const carrying = writable(0);
export const successRate = writable(0);
successRate.subscribe((value) => {
    if (value < 0) {
        successRate.set(0);
    }
    else if (value > 1) {
        successRate.set(1);
    }
})

export enum Destination {
    empty = "$",
    orbit = "Earth Orbit",
    station = "Space station",
    moon = "Moon",
    mars = "Mars",
}

export enum MissionType {
    empty = "$",
    transportation = "Transportation",
    science = "Science",
    tour = "Tourism",
}

export const destination = writable(Destination.empty);
export const missionType = writable(MissionType.empty);
export const missionSeq = writable(-1);
export const missionDescription = writable("");
export const finishedQuestion = writable(0);
export const rocketName = writable("");
export const reward = writable(0);
export const win = writable(false);