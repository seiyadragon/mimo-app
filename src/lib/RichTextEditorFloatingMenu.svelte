<script lang="ts">
    import FaBold from 'svelte-icons/fa/FaBold.svelte'
    import FaItalic from 'svelte-icons/fa/FaItalic.svelte'
    import FaUnderline from 'svelte-icons/fa/FaUnderline.svelte'
    import FaStrikethrough from 'svelte-icons/fa/FaStrikethrough.svelte'
    import FaHighlighter from 'svelte-icons/fa/FaHighlighter.svelte'
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
    import ColorPicker from '$lib/ColorPicker.svelte'
    import { createEventDispatcher } from 'svelte'

    export let editor: any
    export let textColor: string = "black"
    
    let floatingMenuSelectType = "4"
    let floatingMenuSelectMode = "3"
    let floatingMenuFont = "Roboto"
    
    let advancedMenuExpanded = false

    const dispatch = createEventDispatcher()

    const setHeading1 = () => {
        editor.chain().focus().setHeading({ level: 1 }).run();
    };

    const setHeading2 = () => {
        editor.chain().focus().setHeading({ level: 2 }).run();
    };

    const setHeading3 = () => {
        editor.chain().focus().setHeading({ level: 3 }).run();
    };

    const setParagraph = () => {
        editor.chain().focus().setParagraph().run();
    };

    const setBlockquote = () => {
        editor.chain().focus().toggleBlockquote().run();
    };

    const setCodeBlock = () => {
        editor.chain().focus().toggleCodeBlock().run();
    };

    const toggleBold = () => {
        editor.chain().focus().toggleBold().run();
    };

    const toggleItalic = () => {
        editor.chain().focus().toggleItalic().run();
    };

    const toggleHighlight = () => {
        editor.chain().focus().toggleHighlight().run();
    };

    const toggleUnderline = () => {
        editor.chain().focus().toggleUnderline().run();
    };

    const toggleStrikethrough = () => {
        editor.chain().focus().toggleStrike().run();
    };

    const onFloatingMenuchange = () => {
        switch (floatingMenuSelectType) {
            case "1":
                setHeading1()
                break;
            case "2":
                setHeading2()
                break;
            case "3":
                setHeading3()
                break;
            case "4":
                setParagraph()
                break;
            default:
                setParagraph()
                break;
        }
    }

    const onFloatingMenuModeChange = () => {
        switch (floatingMenuSelectMode) {
            case "1":
                setBlockquote()
                break;
            case "2":
                setCodeBlock()
                break;
            case "3":
                editor.chain().focus().unsetBlockquote().unsetCodeBlock().run();
                break;
            default:
                editor.chain().focus().unsetBlockquote().unsetCodeBlock().run();
                break;
        }
    }

    editor.on('update', () => {
        //console.log("editorJustUpdated")

        if (editor.isActive('heading', { level: 1 })) {
            floatingMenuSelectType = "1"
        } else if (editor.isActive('heading', { level: 2 })) {
            floatingMenuSelectType = "2"
        } else if (editor.isActive('heading', { level: 3 })) {
            floatingMenuSelectType = "3"
        } else if (editor.isActive('paragraph')) {
            floatingMenuSelectType = "4"
        }

        if (editor.isActive('blockquote')) {
            floatingMenuSelectMode = "1"
        } else if (editor.isActive('codeBlock')) {
            floatingMenuSelectMode = "2"
        } else {
            floatingMenuSelectMode = "3"
        }

        editor.chain().focus().setFontFamily(floatingMenuFont).run();
    })

    const toggleExpandedMenu = () => {
        advancedMenuExpanded = !advancedMenuExpanded
    }

    const onTextColorChanged = (color: any) => {
        dispatch('textColorChange', color.detail)
    }

    const onBackgroundColorChanged = (color: any) => {
        dispatch('backgroundColorChange', color.detail)
    }

    const fontChange = () => {
        editor.chain().focus().setFontFamily(floatingMenuFont).run();
    }
</script>

<div data-test-id="bubble-menu" class="floatingMenuContainer">
    <div class="floatingMenuSection">
        <select class="floatingMenuSelect" bind:value={floatingMenuSelectType} on:change={onFloatingMenuchange}>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4" selected>Paragraph</option>
        </select>
        <select class="floatingMenuSelect" bind:value={floatingMenuSelectMode} on:change={onFloatingMenuModeChange}>
            <option value="1">Blockquote</option>
            <option value="2">Codeblock</option>
            <option value="3" selected>Regular</option>
        </select>
    </div>
    <div class="floatingMenuSection">
        <select class="floatingMenuSelect" bind:value={floatingMenuFont} on:change={fontChange}>
            <option value="Poiret One">Poiret One</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Playfair D">Playfair D</option>
            <option value="Merriweath">Merriweath</option>
            <option value="Roboto">Roboto</option>
            <option value="Roboto Condensed">Roboto Condensed</option>
            <option value="Roboto Mono">Roboto Mono</option>
            <option value="Roboto Slab">Roboto Slab</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Open Sans Condensed">Open Sans Condensed</option>
            <option value="Open Sans Mono">Open Sans Mono</option>
            <option value="Open Sans Slab">Open Sans Slab</option>
            <option value="Lato">Lato</option>
            <option value="Lato Condensed">Lato Condensed</option>
            <option value="Lato Mono">Lato Mono</option>
            <option value="Lato Slab">Lato Slab</option>
        </select>
    </div>
    <div class="floatingMenuSection">
        <button class={editor.isActive('bold') ? 'floatingMenuButtonActive' : 'floatingMenuButton'} on:click={toggleBold}>
            <div class="regularIcon">
                <FaBold />
            </div>
        </button>
        <button class={editor.isActive('italic') ? 'floatingMenuButtonActive' : 'floatingMenuButton'} on:click={toggleItalic}>
            <div class="regularIcon">
                <FaItalic />
            </div>
        </button>
        <button class={editor.isActive('underline') ? 'floatingMenuButtonActive' : 'floatingMenuButton'} on:click={toggleUnderline}>
            <div class="regularIcon">
                <FaUnderline />
            </div>
        </button>
        <button class={editor.isActive('strike') ? 'floatingMenuButtonActive' : 'floatingMenuButton'} on:click={toggleStrikethrough}>
            <div class="regularIcon">
                <FaStrikethrough />
            </div>
        </button>
        <button class={editor.isActive('highlight') ? 'floatingMenuButtonActive' : 'floatingMenuButton'} on:click={toggleHighlight}>
            <div class="regularIcon">
                <FaHighlighter />
            </div>
        </button>
    </div>
    {#if advancedMenuExpanded}
        <div class="floatingMenuSection">
            <ColorPicker name="TEXT" defaultColor={textColor} on:colorSelected={onTextColorChanged}/>
        </div>
    {/if}
    <button class="expandAdvancedButton" on:click={toggleExpandedMenu}>
        <div class="regularIcon">
            <FaPlus />
        </div>
    </button>
</div>

<style lang="sass">
    @keyframes fadeIn
        0%
            opacity: 0
        100%
            opacity: 1

    @keyframes slideDown
        0%
            transform: translateY(0)
        100%
            transform: translateY(100%)

    .floatingMenuContainer
        align-items: center
        border: 1px solid #ccc
        border-radius: 4px
        padding: 8px
        background-color: black
        animation: fadeIn 0.5s ease-in-out, slideDown 0.5s ease-in-out
        width: 256px
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2)
        display: flex
        flex-direction: column
        row-gap: 8px
        transform: translateY(100%)
        transition: all 0.5s ease-in-out

        .floatingMenuSection
            display: flex
            width: 100%
            justify-content: space-between

        .is-active
            background-color: #333

        .floatingMenuButton
            padding: 8px
            cursor: pointer
            outline: none
            border: solid 1px #333
            background-color: transparent
            border-radius: 4px
            transition: all 0.2s ease-in-out

            &:hover
                border: solid 1px #eee

        .floatingMenuButtonActive
            padding: 8px
            cursor: pointer
            outline: none
            border: solid 1px #eee
            background-color: #333
            border-radius: 4px
            transition: all 0.2s ease-in-out

        .floatingMenuSelect
            border: none
            padding: 8px
            margin: 0
            cursor: pointer
            outline: none
            color: white
            background-color: #333
            border-radius: 4px
            width: 124px

            option
                background-color: #333
                padding: 4px

    .expandAdvancedButton
        border: none
        padding: 8px
        margin: 0
        cursor: pointer
        outline: none
        color: white
        background-color: #333
        border-radius: 4px
        width: 100%
        text-align: center
        font-size: 12px
        font-weight: 600
        text-transform: uppercase
        letter-spacing: 1px
        transition: background-color 0.2s ease-in-out
        display: flex
        justify-content: center

        &:hover
            background-color: #444

    .regularIcon
        width: 16px
        height: 16px
        color: white

</style>