<script lang="ts">
    export let finish: Function;
    import { onMount, onDestroy } from "svelte";
    import { get } from "svelte/store";
    import { astronaut, money, progress, win, name } from "./store";
    import {
        mdiRocketLaunchOutline,
        mdiMicroscope,
        mdiPartyPopper,
    } from "@mdi/js";
    import End from "./End.svelte";
    import Launch from "./Launch.svelte";
    import Setup from "./Setup.svelte";
    import Process from "./Process.svelte";
    import Report from "./Report.svelte";
    import { Icon, Button } from "svelte-chota";
    let currentInfo = { astronaut: get(astronaut), money: get(money) };
    let showComponent = null;
    let nextstep: Function;
    const checkGameOver = () => {
        console.log(currentInfo);
        if (
            get(progress).science === true &&
            get(progress).transportation === true &&
            get(progress).tour === true
        ) {
            win.set(true);
            showComponent = End;
            return true;
        }
        if (currentInfo.astronaut == 0 || currentInfo.money == 0) {
            showComponent = End;
            return true;
        } else {
            return false;
        }
    };

    const launch = () => {
        showComponent = Launch;
        nextstep = missionProcess;
    };

    const missionProcess = () => {
        showComponent = Process;
        nextstep = missionReport;
    };

    const missionReport = () => {
        showComponent = Report;
        nextstep = finish;
    };

    const unsubscribeAstronaut = astronaut.subscribe((value) => {
        currentInfo.astronaut = value;
        checkGameOver();
    });
    const unsubscribeMoney = money.subscribe((value) => {
        currentInfo.money = value;
        checkGameOver();
    });

    const unsubscribeProgress = progress.subscribe((value) => {
        console.log(value);
        checkGameOver();
    });

    onMount(() => {
        console.log("New Round");
        if (checkGameOver() === true) {
            return;
        }
        showComponent = Setup;
        nextstep = launch;
    });

    onDestroy(() => {
        unsubscribeAstronaut();
        unsubscribeMoney();
        unsubscribeProgress();
    });
</script>

{#if $name === "namwoam"}
    <Button
        secondary
        on:click={() => {
            progress.set({ transportation: true, science: true, tour: true });
            money.set(9999);
            astronaut.set(20);
        }}>Super Button</Button
    >
    <Button
        on:click={() => {
            money.set(get(money) + 100);
            astronaut.set(get(astronaut) + 5);
        }}>Boooooonk</Button
    >
{/if}
<p>
    Current balance: {currentInfo.money} million USD , {currentInfo.astronaut} astronaut(s)
    remains
</p>
<p>
    Progress :
    <Icon
        src={mdiRocketLaunchOutline}
        size="36px"
        color={$progress.transportation === true ? "green" : "grey"}
    />
    <Icon
        src={mdiMicroscope}
        size="36px"
        color={$progress.science === true ? "green" : "grey"}
    />
    <Icon
        src={mdiPartyPopper}
        size="36px"
        color={$progress.tour === true ? "green" : "grey"}
    />
</p>

<svelte:component
    this={showComponent}
    finish={nextstep}
    on:restart={() => {
        money.set(get(money) - 5);
        finish();
    }}
/>
