<script lang="ts">
    export let finish: Function;
    import { createEventDispatcher } from "svelte";
    import { Modal, Button, Card, Row, Col, Icon, Field } from "svelte-chota";
    import {
        mdiRestartAlert,
        mdiRocketLaunchOutline,
        mdiMicroscope,
        mdiPartyPopper,
        mdiRocketOutline,
        mdiHammerWrench,
    } from "@mdi/js";
    import {
        Destination,
        destination,
        MissionType,
        missionType,
        finishedQuestion,
        rocketName,
        capacity,
        carrying,
        money,
        successRate,
        missionSeq,
        reward,
        missionDescription,
    } from "./store";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import {
        rocket,
        question,
        optionAvailable,
        payload,
        EssentialPayload,
    } from "./data";
    import Swal from "sweetalert2";
    import { findIndex, shuffle, range, set } from "lodash";
    const dispatch = createEventDispatcher();
    let showRestart = false;
    let missionArray = [];
    let additionalPayloadArray = shuffle(payload.extra);
    const additionalPayloadLimit = 3;
    const reset = () => {
        missionType.set(MissionType.empty);
        destination.set(Destination.empty);
        finishedQuestion.set(0);
        rocketName.set("");
        carrying.set(0);
        capacity.set(0);
        reward.set(0);
        missionSeq.set(-1);
        missionArray = [];
        additionalPayloadArray = shuffle(payload.extra);
        questionRandom = shuffle(question);
        installRecord = Array(additionalPayloadLimit).fill(false);
    };

    onMount(() => {
        reset();
    });

    const getReward = (mission: EssentialPayload) => {
        if (get(destination) === Destination.orbit) {
            return mission.reward.orbit;
        } else if (get(destination) === Destination.station) {
            return mission.reward.station;
        } else if (get(destination) === Destination.moon) {
            return mission.reward.moon;
        } else if (get(destination) === Destination.mars) {
            return mission.reward.mars;
        }
    };
    let questionRandom = shuffle(question);
    let installRecord = Array(additionalPayloadLimit).fill(false);
    const checkAnswer = (answer: optionAvailable) => {
        console.log("Checking answer");
        if (answer === questionRandom[get(finishedQuestion)].correct) {
            Swal.fire({
                title: "Your answer is correct.",
                text: `You are given ${
                    questionRandom[get(finishedQuestion)].reward.money
                } million USD , also the mission success rate is increased by ${questionRandom[
                    get(finishedQuestion)
                ].reward.deltaSuccessRate.toLocaleString("en", {
                    style: "percent",
                })}`,
                icon: "success",
                confirmButtonText: "Next question",
            });
            money.set(
                get(money) + questionRandom[get(finishedQuestion)].reward.money
            );
            successRate.set(
                get(successRate) +
                    questionRandom[get(finishedQuestion)].reward
                        .deltaSuccessRate
            );
        } else {
            Swal.fire({
                title: "Your answer is incorrect.",
                text: "Nothing happens , you have wasted an opportunity.",
                icon: "error",
                confirmButtonText: "Next question",
            });
        }

        finishedQuestion.set(get(finishedQuestion) + 1);
    };
</script>

{#if $rocketName.length != 0}
    <p>
        Spacecraft: {$rocketName}, Chance of success: {$successRate.toLocaleString(
            "en",
            { style: "percent" }
        )}
    </p>
    <p class={$carrying >= $capacity ? "text-error" : "text-success"}>
        Capacity: {$carrying} ton(s)/{$capacity} ton(s)
    </p>
{/if}

{#if $reward != 0}
    <p>Reward: {$reward} million USD</p>
{/if}

<Button
    dark
    icon={mdiRestartAlert}
    class="is-rounded"
    on:click={() => (showRestart = true)}
    title="Abort the mission"
/>

<Modal bind:open={showRestart}>
    <Card>
        <h4 slot="header">Abort the mission</h4>

        <p>This will result a lost of 5 million USD</p>

        <div slot="footer" class="is-right">
            <Button clear on:click={() => (showRestart = false)}>Cancel</Button>
            <Button
                primary
                on:click={() => {
                    reset();
                    showRestart = false;
                    dispatch("restart");
                }}>Confirm</Button
            >
        </div>
    </Card>
</Modal>

{#if $missionType === MissionType.empty}
    <Card>
        <h4 slot="header">Choose your mission type !</h4>
        <Row>
            <Col class="text-center">Transportation</Col>
            <Col class="text-center">Science</Col>
            <Col class="text-center">Tourism</Col>
        </Row>
        <Row>
            <Col class="text-center"
                ><Icon
                    src={mdiRocketLaunchOutline}
                    size="64px"
                    on:click={() => missionType.set(MissionType.transportation)}
                /></Col
            >
            <Col class="text-center"
                ><Icon
                    src={mdiMicroscope}
                    size="64px"
                    on:click={() => missionType.set(MissionType.science)}
                /></Col
            >
            <Col class="text-center"
                ><Icon
                    src={mdiPartyPopper}
                    size="64px"
                    on:click={() => missionType.set(MissionType.tour)}
                /></Col
            >
        </Row>
    </Card>
{:else if $destination === Destination.empty}
    <Card>
        <h4 slot="header">Choose your destination !</h4>
        <Row>
            <Col class="text-center">Earth Orbit</Col>
            <Col class="text-center">Space Station</Col>
            <Col class="text-center">Moon</Col>
            <Col class="text-center">Mars</Col>
        </Row>
        <Row>
            <Col class="text-center"
                ><Icon
                    src="asset/icon/orbit.svg"
                    size="64px"
                    on:click={() => destination.set(Destination.orbit)}
                /></Col
            >
            <Col class="text-center"
                ><Icon
                    src="asset/icon/station.svg"
                    size="64px"
                    on:click={() => destination.set(Destination.station)}
                /></Col
            >
            <Col class="text-center"
                ><Icon
                    src="asset/icon/moon.svg"
                    size="64px"
                    on:click={() => destination.set(Destination.moon)}
                /></Col
            >
            <Col class="text-center"
                ><Icon
                    src="asset/icon/mars.svg"
                    size="64px"
                    on:click={() => destination.set(Destination.mars)}
                /></Col
            >
        </Row>
    </Card>
{:else if $rocketName.length === 0}
    <Card>
        <h4 slot="header">
            Choose a spacecraft ! (Destination: {$destination})
        </h4>
        {#each rocket as el}
            <Row>
                <Col class="text-center">{el.name}</Col>
                <Col class="text-center">Price: {el.cost} million USD</Col>
                <Col size={6}>
                    {el.description}
                </Col>
                <Col size={1}>
                    {#if $destination === Destination.orbit}
                        {el.capacity.orbit === -1
                            ? "Can't reach"
                            : `${el.capacity.orbit} tons`}
                    {:else if $destination === Destination.station}
                        {el.capacity.station === -1
                            ? "Can't reach"
                            : `${el.capacity.station} tons`}
                    {:else if $destination === Destination.moon}
                        {el.capacity.moon === -1
                            ? "Can't reach"
                            : `${el.capacity.moon} tons`}
                    {:else if $destination === Destination.mars}
                        {el.capacity.mars === -1
                            ? "Can't reach"
                            : `${el.capacity.mars} tons`}
                    {/if}
                </Col>
                <Col class="text-center" size={1}>
                    <Button
                        on:click={() => {
                            money.set(get(money) - el.cost);
                            let initCapacity = 0;
                            if (get(destination) === Destination.orbit) {
                                initCapacity = el.capacity.orbit;
                            } else if (
                                get(destination) === Destination.station
                            ) {
                                initCapacity = el.capacity.station;
                            } else if (get(destination) === Destination.moon) {
                                initCapacity = el.capacity.moon;
                            } else if (get(destination) === Destination.mars) {
                                initCapacity = el.capacity.mars;
                            }
                            if (initCapacity < 0) {
                                initCapacity = 0;
                            }
                            capacity.set(initCapacity);
                            successRate.set(
                                el.successRate + (Math.random() - 0.5) * 0.2
                            );
                            if (get(missionType) === MissionType.science) {
                                missionArray = payload.science;
                            } else if (
                                get(missionType) === MissionType.transportation
                            ) {
                                missionArray = payload.transportation;
                            } else if (get(missionType) === MissionType.tour) {
                                missionArray = payload.tour;
                            }
                            rocketName.set(el.name);
                        }}>Buy</Button
                    >
                </Col>
            </Row>
        {/each}
    </Card>
{:else if $finishedQuestion < 4}
    <Card>
        <h4 slot="header">Answer a question ! ({$finishedQuestion}/4)</h4>
        <p>{questionRandom[$finishedQuestion].head}</p>
        <Field>
            <Button on:click={() => checkAnswer(optionAvailable.A)}
                >(A): {questionRandom[$finishedQuestion].optionA}</Button
            >
        </Field>
        <Field>
            <Button on:click={() => checkAnswer(optionAvailable.B)}
                >(B): {questionRandom[$finishedQuestion].optionB}</Button
            >
        </Field>
        <Field>
            <Button on:click={() => checkAnswer(optionAvailable.C)}
                >(C): {questionRandom[$finishedQuestion].optionC}</Button
            >
        </Field>
    </Card>
{:else if $missionSeq === -1}
    <Card>
        <h4 slot="header">Choose a mission ! (Destination: {$destination})</h4>
        {#each missionArray as el}
            <Row>
                <Col class="text-center" size={4}>{el.name}</Col>
                <Col class="text-center">Weight: {el.weight} ton(s)</Col>
                <Col class="text-center"
                    >Reward : {getReward(el) === -1
                        ? "-"
                        : `${getReward(el)} million USD`}
                </Col>
                <Col class="text-center"
                    >{#if getReward(el) == -1}
                        <Button disabled>Unavailable</Button>
                    {:else}
                        <Button
                            on:click={() => {
                                carrying.set(get(carrying) + el.weight);
                                reward.set(getReward(el));
                                missionSeq.set(findIndex(missionArray, el));
                                missionDescription.set(el.name);
                            }}
                            primary>Select</Button
                        >
                    {/if}
                </Col>
            </Row>
        {/each}
    </Card>
{:else}
    <Card>
        <h4 slot="header">Install additional payload !</h4>
        <Row>
            {#each range(additionalPayloadLimit) as i}
                <Col class="text-center"
                    ><b>{additionalPayloadArray[i].name}</b></Col
                >
            {/each}
        </Row>
        <Row>
            {#each range(additionalPayloadLimit) as i}
                <Col class="text-center"
                    >{additionalPayloadArray[i].description}</Col
                >
            {/each}
        </Row>
        <Row>
            {#each range(additionalPayloadLimit) as i}
                <Col class="text-center"
                    >Weight: {additionalPayloadArray[i].weight} ton(s)</Col
                >
            {/each}
        </Row>
        <Row>
            {#each range(additionalPayloadLimit) as i}
                <Col class="text-center"
                    >Price: {additionalPayloadArray[i].cost} million USD</Col
                >
            {/each}
        </Row>
        <Row>
            {#each range(additionalPayloadLimit) as i}
                <Col class="text-center">
                    {#if installRecord[i] === false}
                        <Button
                            icon={mdiHammerWrench}
                            on:click={() => {
                                if (additionalPayloadArray[i].cost > 0) {
                                    money.set(
                                        get(money) -
                                            additionalPayloadArray[i].cost
                                    );
                                } else {
                                    reward.set(
                                        get(reward) -
                                            additionalPayloadArray[i].cost
                                    );
                                }

                                if (additionalPayloadArray[i].weight > 0) {
                                    carrying.set(
                                        get(carrying) +
                                            additionalPayloadArray[i].weight
                                    );
                                } else {
                                    capacity.set(
                                        get(capacity) -
                                            additionalPayloadArray[i].weight
                                    );
                                }

                                successRate.set(
                                    get(successRate) +
                                        additionalPayloadArray[i]
                                            .effectSuccessRate
                                );
                                installRecord[i] = true;
                                installRecord = installRecord;
                            }}>Install</Button
                        >
                    {:else}
                        <Button icon={mdiHammerWrench} disabled
                            >Installed</Button
                        >
                    {/if}</Col
                >
            {/each}
        </Row>
        <div slot="footer" class="is-right">
            <Button primary icon={mdiRocketOutline} on:click={() => finish()}
                >Ready For Launch</Button
            >
        </div>
    </Card>
{/if}
