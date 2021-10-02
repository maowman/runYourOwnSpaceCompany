
export const rocket: Array<Rocket> = [
    {
        name: "Primitive Rocket",
        cost: 10,
        capacity: {
            orbit: 5,
            station: -1,
            moon: -1,
            mars: -1
        },
        successRate: 0.6,
        description: "A rocket using out-dated technology."
    },
    {
        name: "Space Shuttle",
        cost: 37,
        capacity: {
            orbit: 27,
            station: 10,
            moon: -1,
            mars: -1
        },
        successRate: 0.8,
        description: "A innovative design , aim to replace rockets with superior cost effectiveness."
    },
    {
        name: "Modern Rocket",
        cost: 72,
        capacity: {
            orbit: 22.8,
            station: 8.3,
            moon: 6,
            mars: -1
        },
        successRate: 0.7,
        description: "A well-balenced design , suited for most space missions."
    },
    {
        name: "Next-Generation Rocket",
        cost: 135,
        capacity: {
            orbit: 53,
            station: 21.2,
            moon: 17.6,
            mars: 13.2
        },
        successRate: 0.4,
        description: "Utilizing state of the art technology , have the capability to reach every corner of the solar system."

    },
    {
        name: "Behemoth Rocket",
        cost: 54,
        capacity: {
            orbit: 14,
            station: 9,
            moon: 4,
            mars: -1
        },
        successRate: 1,
        description: "Though a bit outdated , still being a econmical option due to its reliability."
    },
    {
        name: "Interstellar Spaceship",
        cost: 178,
        capacity: {
            orbit: -1,
            station: -1,
            moon: 30.7,
            mars: 24.3
        },
        successRate: 0.4,
        description: "Since still under development , suffers from instability and high price , but have huge potencial in regard of building new space settlement",
    }
]

interface Rocket {
    name: string;
    cost: number;
    capacity: {
        orbit: number;
        station: number;
        moon: number;
        mars: number;
    }
    description: string;
    successRate: number;
}

export const payload: Payload = {
    transportation: [
        {
            name: "Repair satellite using robotic arm", reward: { orbit: 19, station: -1, moon: -1, mars: -1 }, weight: 1.7, file: "repair.jpg"
        },
        {
            name: "Deliver space settlement infrastructure", reward: { orbit: -1, station: -1, moon: 167, mars: 264 }, weight: 15.2, file: ""
        },
        {
            name: "Deliver various supplement", reward: { orbit: -1, station: 57, moon: 109, mars: 211 }, weight: 9.6, file: "delivery.jpg"
        }
    ],
    science: [
        {
            name: "Launch a Rover", reward: { orbit: -1, station: -1, moon: 84, mars: 115 }, weight: 5.1, file: "rover.jpg"
        },
        {
            name: "Launch a investigation probe", reward: { orbit: -1, station: -1, moon: 75, mars: 93 }, weight: 3.2, file: ""
        },
        {
            name: "Send astronaut to do research in space", reward: { orbit: -1, station: 137, moon: 248, mars: 301 }, weight: 20.6, file: "experiment.jpg"
        }
    ],
    tour: [
        {
            name: "Hold a tour to appreciate the gorgeous planet ", reward: { orbit: 200, station: -1, moon: 300, mars: 400 }, weight: 24, file: "tour.jpg"
        },
        {
            name: "Experience fantastic Zero-g", reward: { orbit: 10, station: -1, moon: -1, mars: -1 }, weight: 0.6, file: "zero-g.jpg"
        }
    ],
    extra: [
        { name: "AI Supercomputer", weight: 1.4, description: "It can minimize casualties when things goes south.", cost: 23, effectSuccessRate: 0.2 },
        { name: "Additional Booster", weight: -3.6, description: "Provides a significant amount of additional thrust , but reduce the overall balance of the spacecraft.", cost: 11, effectSuccessRate: -0.2 },
        { name: "Engine Readjustment", weight: -7.2, description: "Provides a mediocre amount of additional thrust , has no effect on the stability of the spacecraft.", cost: 17, effectSuccessRate: 0 },
        { name: "Cost Reduction Process", weight: 0, description: "It cuts the expanse of the prodution , but might leads to catastrophic result.", cost: -45, effectSuccessRate: -0.3 },
        { name: "Backup Atomic Battery", weight: 7.5, description: "Having backup can greatly reduce the possibility of accidents.", cost: 27, effectSuccessRate: 0.4 },
        { name: "Commercial Delivery Service", weight: 5.2, description: "Earning extra by carring extra.", cost: -30, effectSuccessRate: -0.1 },

    ],

}

export interface EssentialPayload {
    name: string;
    reward: {
        orbit: number;
        station: number;
        moon: number;
        mars: number;
    },
    file: string;
    weight: number;
}

interface AdditionalPayload {
    name: string;
    description: string;
    weight: number;
    cost: number;
    effectSuccessRate: number;
}

interface Payload {
    transportation: Array<EssentialPayload>;
    science: Array<EssentialPayload>;
    tour: Array<EssentialPayload>;
    extra: Array<AdditionalPayload>;
}

interface Question {
    head: string;
    optionA: string;
    optionB: string;
    optionC: string;
    reward: {
        money: number;
        deltaSuccessRate: number;
    }
    correct: optionAvailable;
}

export enum optionAvailable {
    A,
    B,
    C,
}

export const question: Array<Question> = [
    {
        head: "Artificial gravity is an internal force that mimics the gravitational force on Earth. Research has shown prolonged weightlessness will have a negative impact on an astronaut's physical health. Thus artificial gravity is essential to human spaceflight. But how can a spaceship generate that internal force? (Hint : Newton’s first law)",
        optionA: "Heat up the spaceship",
        optionB: "Spin the spaceship",
        optionC: "Expose the spaceship to radiation",
        correct: optionAvailable.B,
        reward: {
            money: 10,
            deltaSuccessRate: 0
        }
    },
    {
        head: "Astronauts can’t survive in the vacuum, so a spacesuit is required to perform certain activities like spacewalk or moonwalk. To your common sense, which one of the following is not a functionality of a spacesuit?",
        optionA: "Digital entertainment system",
        optionB: "Communication system with the spaceship",
        optionC: "Oxygen supply system",
        correct: optionAvailable.A,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1
        }
    },
    {
        head: "Eventhough the computers are extremely helpful, there are still times when astronauts have to write something by themselves. Due to the absence of gravitational force, a simple ball pen would not work. Which of the following do you think will be the optimal solution to this problem? (Hint : 3 Idiots, a inspiring movie about education)",
        optionA: "Pencil",
        optionB: "A special pen that stores nitrogen and uses its pressure to inject ink into the tip of the pen(also known as 'space pen')",
        optionC: "Quill",
        correct: optionAvailable.B,
        reward: {
            money: 10,
            deltaSuccessRate: 0
        }
    },
    {
        head: "According to Nasa’s official explanation. The 'gravity assist' flyby technique can add or subtract momentum to increase or decrease the energy of a spacecraft's orbit. Generally it has been used in solar orbit, to increase a spacecraft's velocity and propel it outward in the solar system, much farther away from the Sun than its launch vehicle would have been capable of doing. What underlying theory do you think makes this technique possible?",
        optionA: "Laws of thermodynamics",
        optionB: "Newton's laws of motion and Newton’s law of universal gravitation",
        optionC: "Three Laws of Robotics",
        correct: optionAvailable.B,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1
        }
    },
    {
        head: "Just like any other special missions, communication is a key for the mission to success. During a space mission, having a continuous communication between the crew and the mission control center, can be beneficial to things like handling emergencies, or sending back the research data. Which of the following waves do you think they use to transmit messages?",
        optionA: "Sound wave",
        optionB: "Gravity wave",
        optionC: "Electron magnetic wave",
        correct: optionAvailable.C,
        reward: {
            money: 10,
            deltaSuccessRate: 0
        }
    },
    {
        head: "Since humans need nutrition to operate properly, food supply is an integral part in all the human spaceflight missions. In order to prevent fluids from damaging surrounding equipment, dehydrated food and drinks within special sealed packages are usually their only options. According to the information above, which of the following foods can’t be found on spaceships or space stations?",
        optionA: "Instant noodles",
        optionB: "Coffee within sealed container",
        optionC: "Dehydrated meat",
        correct: optionAvailable.A,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1
        }
    },
    {
        head: "The early Earth continued to change and evolve into a place where life could have gotten started. Oceans, beaches, rock surfaces, volcanoes, and other unique environments took shape as the young planet began to mature. Life arose through the interaction of life’s building blocks, or raw materials (small compounds like carbon dioxide, methane, and other carbon-containing molecules), in specialized environments on the early Earth where energy was available. These interactions led to the building of larger chemical compounds such as amino acids and the precursors to DNA. Which place is most likely to make these reactions happen?",
        optionA: "Polar region",
        optionB: "Hydrothermal vents(A hydrothermal vent is a fissure on the seafloor from which geothermally heated water discharges. Some rocks and mineral ore deposits are formed by the action of hydrothermal vents)",
        optionC: "Volcano",
        correct: optionAvailable.B,
        reward: {
            money: 20,
            deltaSuccessRate: 0
        }
    },
    {
        head: "Mars has a thin atmosphere made up mostly of carbon dioxide (CO2), argon (Ar), nitrogen (N2), and a small amount of oxygen and water vapor. Mars is also a cold desert world. It is half the size of Earth. Mars is sometimes called the Red Planet. It's red because of _______in the ground.",
        optionA: "NO2",
        optionB: "HgO",
        optionC: "Fe2O3",
        correct: optionAvailable.C,
        reward: {
            money: 10,
            deltaSuccessRate: 0.1
        }
    },
    {
        head: "Spacecraft navigation comprises three main aspects: designing a reference trajectory, keeping track of the actual spacecraft position, creating maneuvers to bring the spacecraft back to the reference trajectory. Among the three aspects, keeping track of where the spacecraft has been is the job of the orbit determination team. The spacecraft is always drifting away from its planned flight path because of disturbances it encounters in space. Even small disturbances, like_________, can add up over time and push the spacecraft off course. Which of the following can be filled into the blank?",
        optionA: "Light",
        optionB: "Sound wave",
        optionC: "The Force, just like in the movie 'STAR WARS'",
        correct: optionAvailable.A,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1
        }
    },
    {
        head: "The young Sun, just like the young Earth, was very different than it is now. The Sun creates all of that light and heat through a process called “nuclear fusion”; that’s where atoms of one element are turned into atoms of another element (they’re fused together!). The Sun mostly does this by turning hydrogen into helium. Which physics law is related to the above phenomenon?",
        optionA: "Law of conservation of energy",
        optionB: "Law of conservation of momentum",
        optionC: "Law of conservation of mass-energy",
        correct: optionAvailable.C,
        reward: {
            money: 0,
            deltaSuccessRate: 0.2
        }
    },
    {
        head: "Just outside of Neptune’s orbit is a ring of icy bodies. We call it the Kuiper Belt. This is where you’ll find dwarf planet Pluto. It’s the most famous of the objects floating in the Kuiper Belt, which are also called Kuiper Belt Objects, or KBOs. You can also find comets and dwarf planets in the Kuiper Belt. Which object is NOT likely to be found in the Kuiper Belt?",
        optionA: "Rock",
        optionB: "Ice",
        optionC: "Lava",
        correct: optionAvailable.C,
        reward: {
            money: 15,
            deltaSuccessRate: 0.15,
        }
    },
    {
        head: "Jupiter is a gas giant and doesn't have a solid surface, but it may have a solid inner core about the size of Earth. It also has rings, but they're too faint to see very well. Jupiter's familiar stripes and swirls are actually cold, windy clouds of ammonia and water, floating in an atmosphere of hydrogen and helium. In addition, its iconic Great Red Spot is actually a ________ that’s about twice the size of Earth and has existed for over a century.",
        optionA: "Giant volcano",
        optionB: "Giant storm",
        optionC: "Giant sierra",
        correct: optionAvailable.B,
        reward: {
            money: 20,
            deltaSuccessRate: 0,
        }
    },
    {
        head: "Recently, astronomers have detected X-rays from Uranus for the first time, using NASA’s Chandra X-ray Observatory. This result may help scientists learn more about this enigmatic ice giant planet in our solar system. Which could cause Uranus to emit X-rays?",
        optionA: "The Sun",
        optionB: "Comets",
        optionC: "Meteorites",
        correct: optionAvailable.A,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1,
        }
    },
    {
        head: "Why are there more craters on the far side of the moon than ones on the near side?",
        optionA: "Because of the forming process of the moon",
        optionB: "Because they are mostly made by the impact of meteors",
        optionC: "Because of aliens",
        correct: optionAvailable.B,
        reward: {
            money: 10,
            deltaSuccessRate: 0,
        }
    },
    {
        head: "Hydrazine (N2H4) is commonly used in various rocket fuels. One of the processes to prepare it can be written in this way: xNH3 + (CH3)2CO + Cl2 -> (CH3)2C(N2H2) + yNH4Cl + H2O(CH3)2C(N2H2) + zH2O → (CH3)2CO + uN2H4 . What is the value of x+y+z+u?",
        optionA: "5",
        optionB: "7",
        optionC: "8",
        correct: optionAvailable.C,
        reward: {
            money: 15,
            deltaSuccessRate: 0.15,
        }
    },
    {
        head: "Fullerene(C60, also called Buckyball) can be found in outer space. Which of the following numbers should be the closest to the atomic mass of fullerene?",
        optionA: "540",
        optionB: "720",
        optionC: "900",
        correct: optionAvailable.B,
        reward: {
            money: 15,
            deltaSuccessRate: 0.15,
        }
    },
    {
        head: "Stars produce their energy by a reaction called nuclear fusion. In recent years, many scientists have tried to use this way to generate electricity on the Earth. However, there is still no nuclear fusion power plant in the world. Which of the following is the most likely factor to make this happen?",
        optionA: "Temperature",
        optionB: "Humidity",
        optionC: "Biological interference",
        correct: optionAvailable.A,
        reward: {
            money: 10,
            deltaSuccessRate: 0,
        }
    },
    {
        head: "The brightness of a star is described in a unitless measure, magnitude. Which star is the darkest among them (All of them are written as apparent magnitude)?",
        optionA: "Star A - Magnitude: -1.0",
        optionB: "Star B - Magnitude: 0.0",
        optionC: "Star C - Magnitude: 1.0",
        correct: optionAvailable.C,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1,
        }
    },
    {
        head: "Which of the following is not a correct description of black holes?",
        optionA: "The first photo of a black hole is captured by the Event Horizon Telescope(EHT).",
        optionB: "The black color of the hole is caused by its extremely strong gravity.",
        optionC: "The sun will become a black hole long time after.",
        correct: optionAvailable.C,
        reward: {
            money: 10,
            deltaSuccessRate: 0,
        }
    },
    {
        head: "Redshift is the phenomenon of an increase in the wavelength, and corresponding in the frequency of electromagnetic radiation. Hubble found that most spectral lines of the galaxies in space have this phenomenon. Which of the following reasons leads to Hubble’s observation result?",
        optionA: "The error of Hubble’s observation.",
        optionB: "The expansion of the space.",
        optionC: "Something is absorbed in the space.",
        correct: optionAvailable.B,
        reward: {
            money: 0,
            deltaSuccessRate: 0.1,
        }
    },
    {
        head: "Which of the following stars is not included in the Summer Triangle?",
        optionA: "Spica (α Vir)",
        optionB: "Altair (α Aql)",
        optionC: "Vega (α Lyr)",
        correct: optionAvailable.A,
        reward: {
            money: 10,
            deltaSuccessRate: 0.1,
        }
    }

]

