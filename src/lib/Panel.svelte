
<div class={`${$$props.class} panel`}>
    <slot />
</div>

<style lang="sass">
    .panel
        border: 1px solid #ccc
        border-radius: 4px
        padding: 4px
        margin-left: auto
        margin-right: auto
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2)

        &:focus
            border-color: #aaa
            outline: none
</style>