<script lang="ts">
    export let finish: Function;
    import {
        successRate,
        missionType,
        MissionType,
        progress,
        money,
        reward,
        astronaut,
        destination,
        rocketName,
        carrying,
        capacity,
        missionSeq,
    } from "./store";
    import { mdiNewBox } from "@mdi/js";
    import { Card, Button } from "svelte-chota";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    let success = false;
    onMount(() => {
        const result = Math.random();
        const standard = get(successRate);
        console.log({ result, standard });
        if (get(successRate) > result) {
            success = true;
            money.set(get(money) + get(reward));
        } else {
            astronaut.set(get(astronaut) - 1);
        }
    });

    const updateProgress = () => {
        if (success === false) {
            return;
        }
        let beforeProgress = get(progress);
        if (get(missionType) === MissionType.transportation) {
            beforeProgress.transportation = true;
        } else if (get(missionType) === MissionType.science) {
            beforeProgress.science = true;
        } else if (get(missionType) === MissionType.tour) {
            beforeProgress.tour = true;
        }
        progress.set(beforeProgress);
    };

    const messages = {
        transportation: [
            {
                success: `You found the broken satellite. However, It is damaged more severely than you have thought: Not only the telescope but also the thruster was crushed by the space debris. Then you remember that you prepared the tool for the thruster in advance. You complete the mission and make the satellite function again.`,
                fail: `You just found the broken satellite. However, It is damaged more severely than you have thought: Not only the telescope but also the thruster was crushed by the space debris. You can’t repair the thruster because you didn’t bring a relative tool.`,
            },
            {
                success: `You arrived at the ${get(
                    destination
                )} and used the material and machine to expand the settlement.`,
                fail: "Most of the machinary are broken due to the severe vibration during the flight, this mission ended up being a waste of money.",
            },
            {
                success: `You arrive at the ${get(
                    destination
                )} and finish your mission. Good Job!`,
                fail: `After you arrive at the ${get(
                    destination
                )}, you discover that you miss one instrument on your list. The research team can’t continue their experiment because of your negligence. Mission fails.`,
            },
        ],
        science: [
            {
                success:
                    "The rover lands on the ground successfully and begins to search for some new discoveries. Congratulations!",
                fail: `Because of the calculative mistake, the rover didn’t land on the ${get(
                    destination
                )} successfully. It crashed on the ground and broke.`,
            },
            {
                success:
                    "The rocket takes off. It perfectly releases the probe and everything gets into the track.",
                fail: `When the ${get(
                    rocketName
                )} takes off, one of the boosters crashes into the main body , causing a huge explosion. You can do nothing but watch your investment burn into debris.`,
            },
            {
                success: `The scientists travel  for a few months, finally arrive at the ${get(
                    destination
                )}. Everything goes well and everyone is excited to start their research on the mysterious land.`,
                fail: ` The scientists travel for a few months, finally arrive at the ${get(
                    destination
                )}. However, the ${get(
                    rocketName
                )} tiped over during the landing phase. Scientists get off the craft immediately, but all the instruments were destroyed in the crash.`,
            },
        ],
        tour: [
            {
                success:
                    "Your instinct tells you that you should check the oxygenator in person and you find it broken. Thanks to this trivial act, you stop a catastrophe from happening.",
                fail: `You have little preparation time, so you just check the oxygenator roughly. You have a bad feeling about this, but you try to persuade yourself that everything will be fine. However,when the ${get(
                    rocketName
                )} goes into space, the oxygenator is out of service. Although the company assigns all the rescue team they have to help you, there are still some casualties in this disastrous tour.`,
            },
            {
                success: `”This is the most incredible experience in my life!”  A lot of passengers say after the ${get(
                    rocketName
                )} lands on the ground.As You look at their face with a contented smile, you think your effort is worthwhile.`,
                fail: `When the spacecraft goes out of the atmosphere, a passenger bumped his head onto the chamber due to the accelerate .He lost consciousness immediately , thus you decide to fly back and cancel the tour. Other passengers seem to be unhappy.`,
            },
        ],
    };

    const getMessage = (successful: boolean) => {
        if (get(carrying) > get(capacity)) {
            return `The ${get(
                rocketName
            )} can't take off at all because the payload exceeded its maximum capacity`;
        } else {
            let mission = { success: "", fail: "" };
            if (get(missionType) === MissionType.transportation) {
                mission = messages.transportation[get(missionSeq)];
            } else if (get(missionType) === MissionType.science) {
                mission = messages.science[get(missionSeq)];
            } else if (get(missionType) === MissionType.tour) {
                mission = messages.tour[get(missionSeq)];
            }
            console.log({ success, mission });
            if (successful === true) {
                return mission.success;
            } else if (successful === false) {
                return mission.fail;
            }
        }
        return "";
    };
</script>

<Card>
    <h4 slot="header">Mission Report:</h4>
    <p>
        {success === true
            ? `Congratulations! , the mission is successful. Resultingly your company receive ${get(
                  reward
              )} million USD.`
            : "Unfortunately , the mission failed. Consequently your company lost one astronaut."}
    </p>
    <p>{getMessage(success)}</p>
    <div slot="footer" class="is-right">
        <Button
            primary
            icon={mdiNewBox}
            on:click={() => {
                updateProgress();
                finish();
            }}>New Mission</Button
        >
    </div>
</Card>
