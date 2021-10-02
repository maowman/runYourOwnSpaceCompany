<script lang="ts">
    export let finish: Function;
    import { Card, Button, Icon, Row, Col } from "svelte-chota";
    import { mdiRocketLaunchOutline } from "@mdi/js";
    import {
        uniqueNamesGenerator,
        colors,
        animals,
    } from "unique-names-generator";
    import {
        rocketName,
        capacity,
        carrying,
        missionDescription,
        successRate,
        destination,
    } from "./store";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    onMount(() => {
        if (get(carrying) > get(capacity)) {
            successRate.set(0);
        } else {
            successRate.set(
                get(successRate) - 0.2 * (get(carrying) / get(capacity))
            );
        }
    });
</script>

<Card>
    <h4 slot="header">Final Countdown!</h4>
    <Row>
        <Col class="text-center"
            ><Icon
                class="is-center"
                size="256px"
                src="asset/icon/solar.svg"
            /></Col
        >
    </Row>
    <p>
        After months of preparation, everything comes together at last. You and
        your employees are sitting in the command center, watching the fuel tank
        of the spacecraft being filled up.
    </p>
    <p>
        The rocket you are going to launch is {$rocketName}, code name: {uniqueNamesGenerator(
            {
                dictionaries: [colors, animals],
                separator: "",
                length: 2,
                style: "capital",
            }
        )}. It will travel to {$destination} and complete its mission: {$missionDescription}.
    </p>
    <p>
        It carries {$carrying} ton(s) of payload out of its {$capacity} ton(s) of
        capacity. According to statistics , the success rate is {$successRate.toLocaleString(
            "en",
            { style: "percent" }
        )}.
    </p>
    <p>Now it’s your turn to press the launch button.</p>
    <div slot="footer" class="is-right">
        <Button primary icon={mdiRocketLaunchOutline} on:click={() => finish()}
            >Launch</Button
        >
    </div>
</Card>
