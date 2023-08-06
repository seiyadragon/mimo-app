<script lang="ts">
    export let color: string = "#000000";
    export let selected: boolean = false;
</script>

<div class={selected ? "colorBoxSelected" : "colorBox"} style="
    background-color: {color};
"/>

<style lang="sass">
    .colorBox
        width: 16px
        height: 16px
        border: solid 1px #333
        transition: all 0.2s ease-in-out
        margin: 0

        &:hover
            border: solid 1px #eee

    .colorBoxSelected
        width: 16px
        height: 16px
        border: solid 1px #333
</style>