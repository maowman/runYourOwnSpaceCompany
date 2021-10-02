<script lang="ts">
    import { astronaut, money, win } from "./store";
    import { Card, Button, Field, Input } from "svelte-chota";
    import { mdiRestart } from "@mdi/js";
</script>

<Card>
    <h4 slot="header">
        {#if $win === true}
            You have won!
        {:else}
            You have lost!
        {/if}
    </h4>
    <figure class="is-center">
        <img src="asset/{$win === true ? 'win.jpg' : 'lost.jpg'}" alt="" />
    </figure>
    {#if $win === true}
        <p>
            Congratulations! You have successfully finish all three categories
            of missions.
        </p>
        <p>
            You as the CEO of the Bonk Space, have proven the company to be a
            reliable contractor.
        </p>
        <p>
            The Bonk Space thus have a bright future all because of your hard
            work and dedication.
        </p>
        <p>Now you can retire and enjoy your life!</p>
    {:else}
        <p>Unfortunately, The Bonk Space has gone out of business.</p>
        <p>Due to the fact that {$money === 0? "the company has no money left":"the company has no astronaut at its service"}.</p>
        <p>
            You as the last CEO of the company, have nothing to do to save your
            dream.
        </p>
    {/if}
    <div slot="footer" class="is-right">
        {#if $win === true}
            <Button primary icon={mdiRestart} on:click={() => location.reload()}
                >Play again</Button
            >
        {:else}
            <Button error icon={mdiRestart} on:click={() => location.reload()}
                >Restart</Button
            >
        {/if}
    </div>
</Card>
