<script lang="ts">
    import Panel from "$lib/Panel.svelte";
    import Container from "$lib/Container.svelte";
    import MIMO_LOGO from "$lib/images/MIMO_LOGO.png";
</script>

<header>
    <nav>
        <Panel>
            <Container>
                <div class="navbar">
                    <div class="logo">
                        <a href="/">
                            <img src={MIMO_LOGO} alt="logo" width="64px"/>
                        </a>
                    </div>
                    <div class="navigation">

                    </div>
                </div>
            </Container>
        </Panel>
    </nav>
</header>

<style lang="sass">
    .navbar
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        height: 68px
        width: 100%

        .navigation
            height: 100%
            width: 100%

        .logo
            img
                margin-left: -4px
</style>