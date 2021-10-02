<script lang="ts">
    export let finish: Function;
    import { Card, Button } from "svelte-chota";
    import {
        missionDescription,
        destination,
        missionSeq,
        missionType,
        MissionType,
    } from "./store";
    import { mdiArrowRight } from "@mdi/js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { payload } from "./data";
    let file = "";
    onMount(() => {
        let seq = get(missionSeq);
        if (get(missionType) === MissionType.science) {
            file = payload.science[seq].file;
        } else if (get(missionType) === MissionType.transportation) {
            file = payload.transportation[seq].file;
        } else if (get(missionType) === MissionType.tour) {
            file = payload.tour[seq].file;
        }
    });
</script>

<Card>
    <h4 slot="header">
        Mission: {$missionDescription} , Destination: {$destination}
    </h4>
    <figure class="is-center">
        <img src="asset/{file}" alt="" />
    </figure>
    <div slot="footer" class="is-right">
        <Button primary icon={mdiArrowRight} on:click={() => finish()}
            >Next</Button
        >
    </div>
</Card>
