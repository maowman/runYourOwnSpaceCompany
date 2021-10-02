<script lang="ts">
    export let finish: Function;
    import { Card, Button, Field, Input } from "svelte-chota";
    import { mdiAccountMultipleCheck } from "@mdi/js";
    import { name } from "./store";
    let inputName = "";
    const nextSection = () => {
        if (inputName.length != 0) {
            name.set(inputName);
        }
        finish();
    };
</script>

<Card>
    <h4 slot="header">Tell us your name!</h4>
    <figure class="is-center">
        <img src="asset/logo.jpg" alt="" />
    </figure>
    <div slot="footer" class="is-right">
        <Field gapless>
            <Input bind:value={inputName} />
            <Button
                primary
                icon={mdiAccountMultipleCheck}
                on:click={() => nextSection()}
            />
        </Field>
    </div>
</Card>
