<script lang="ts">
    import Container from "$lib/Container.svelte";
	import Navbar from "$lib/Navbar.svelte";
	import Panel from "$lib/Panel.svelte";
    import RichTextEditor from "$lib/RichTextEditor.svelte";
    import heroImage from "$lib/images/hero.jpg";
	import { onMount } from "svelte";
    import ColorBox from "$lib/ColorBox.svelte";

    let richTextEditor: RichTextEditor
</script>

<Container>
    <Panel class="heroImage">
        <img src={heroImage} alt="Hero"/>
    </Panel>
    <Panel>
        <h1 class="pageTitle">BECOMING THE BEST YOU POSSIBLY CAN</h1>
    </Panel>
    <Panel class="mainBody">
        <RichTextEditor class="richTextEditor" bind:this={richTextEditor}/>
    </Panel>
</Container>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300;400;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans+Mono:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans+Slab:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Lato+Condensed:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Lato+Mono:wght@100;300;400;500;700&display=swap')
    @import url('https://fonts.googleapis.com/css2?family=Lato+Slab:wght@100;300;400;500;700&display=swap')

    :global(body)
        font-family: 'Roboto', sans-serif
        color: black

    :global(.mainBody)
        margin-top: 20px
        margin-bottom: 20px
        min-height: 256px

    :global(.richTextEditor)
        min-height: 256px

    :global(.heroImage)
        margin-top: 20px
        margin-bottom: 20px
        height: 200px

        img
            width: 100%
            height: 100%
            object-fit: cover
            border-radius: 4px

    .pageTitle
        font-size: 2.5rem
        font-weight: 900
        color: #333
</style>
