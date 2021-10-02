<script lang="ts">
    import "chota";
    import { Container } from "svelte-chota";
    import { onMount } from "svelte";
    import Name from "./Name.svelte";
    import Welcome from "./Welcome.svelte";
    import Round from "./Round.svelte";
    let currentComponent = null;
    const intro = () => {
        currentComponent = Welcome;
        next = newRound;
    };
    const newRound = () => {
        console.log("new round");
        currentComponent = null;
        currentComponent = Round;
        next = newRound;
    };
    const init = () => {
        currentComponent = Name;
        next = intro;
    };
    let next = init;
    onMount(() => {
        next();
    });
</script>

<Container>
    <h1 class="is-paddingless is is-marginless">
        Run Your Own Space Company 🚀
    </h1>
    <p>Made by the Bonk Team</p>
</Container>
{#key currentComponent}
    <Container>
        <svelte:component this={currentComponent} finish={next} />
    </Container>
{/key}
