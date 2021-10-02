<script lang="ts">
    export let finish: Function;
    import { Card, Button, Field, Input } from "svelte-chota";
    import { name, money, astronaut } from "./store";
    import { mdiSpaceStation } from "@mdi/js";
</script>

<Card>
    <h4 slot="header">Welcome !</h4>
    <p>
        Hello {$name} , welcome to join the Bonk Space !
    </p>
    <p>
        Bonk Space is a company which aims at scientific exploration and space
        travel.
    </p>
    <p>
        For decades of development, we have constructed our own space station,
        Moon settlement and Mars settlement. Being the new CEO, your job is to
        operate missions , make profits and assure crews’ safety during the
        journey. Space industry has potential but is dangerous and always
        consumes a lot of resources. While doing the mission, you need to
        evaluate the budget seriously and find any potential risks to keep crews
        from accidents.You will begin the game with {$money} million USD and {$astronaut}
        astronauts, if one of them becomes 0, the game is over.
    </p>
    <p>
        In order to prove Bonk Space to be a reliable contractor, you must
        complete all three categories of missions: "Transportation", "Science"
        and "Tourism" at least once.
    </p>
    <p>If you are ready to take this position, click the start button.</p>

    <div slot="footer" class="is-right">
        <Button primary icon={mdiSpaceStation} on:click={() => finish()}
            >Start</Button
        >
    </div>
</Card>
