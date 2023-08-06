<script lang="ts">
	import ColorBox from "./ColorBox.svelte";
    import { createEventDispatcher, onMount } from "svelte";

    export let name: string = "colorPicker";
    export let defaultColor: string = "white";

    const dispatch = createEventDispatcher();

    let selectedColor = "white"
    let colorEnabled: {key: string, value: boolean}[] = [
        {key: "white", value: false},
        {key: "black", value: false},
        {key: "red", value: false},
        {key: "green", value: false},
        {key: "blue", value: false},
        {key: "yellow", value: false},
        {key: "orange", value: false},
        {key: "purple", value: false},
        {key: "pink", value: false},
        {key: "brown", value: false},
        {key: "gray", value: false},
        {key: "lightgray", value: false},
        {key: "darkgray", value: false},
        {key: "cyan", value: false},
        {key: "magenta", value: false},
        {key: "teal", value: false},
        {key: "olive", value: false},
        {key: "navy", value: false},
        {key: "maroon", value: false},
        {key: "lime", value: false},
        {key: "aqua", value: false},
        {key: "silver", value: false},
        {key: "gold", value: false},
        {key: "indigo", value: false},
        {key: "violet", value: false},
        {key: "turquoise", value: false},
        {key: "tan", value: false},
        {key: "chocolate", value: false},
        {key: "coral", value: false},
        {key: "crimson", value: false},
        {key: "darkgreen", value: false},
        {key: "darkorange", value: false},
        {key: "darkred", value: false},
        {key: "deeppink", value: false},
        {key: "firebrick", value: false},
        {key: "forestgreen", value: false},
        {key: "fuchsia", value: false},
        {key: "hotpink", value: false},
        {key: "indianred", value: false},
        {key: "khaki", value: false},
        {key: "lightblue", value: false},
        {key: "lightgreen", value: false},
        {key: "lightpink", value: false},
        {key: "lightsalmon", value: false},
        {key: "lightseagreen", value: false},
        {key: "lightskyblue", value: false},
        {key: "lightsteelblue", value: false},
        {key: "limegreen", value: false},
        {key: "mediumaquamarine", value: false},
        {key: "mediumblue", value: false},
        {key: "mediumorchid", value: false},
        {key: "mediumpurple", value: false},
        {key: "mediumseagreen", value: false},
        {key: "mediumslateblue", value: false},
        {key: "mediumturquoise", value: false},
        {key: "mediumvioletred", value: false},
    ]

    let colorValues: any = {
        "aliceblue":"#f0f8ff", "antiquewhite":"#faebd7", "aqua":"#00ffff", "aquamarine":"#7fffd4", "azure":"#f0ffff", "beige":"#f5f5dc", "bisque":"#ffe4c4", "black":"#000000", "blanchedalmond":"#ffebcd", "blue":"#0000ff", "blueviolet":"#8a2be2", "brown":"#a52a2a", "burlywood":"#deb887", "cadetblue":"#5f9ea0", "chartreuse":"#7fff00", "chocolate":"#d2691e", "coral":"#ff7f50", "cornflowerblue":"#6495ed", "cornsilk":"#fff8dc", "crimson":"#dc143c", "cyan":"#00ffff", "darkblue":"#00008b", "darkcyan":"#008b8b", "darkgoldenrod":"#b8860b", "darkgray":"#a9a9a9", "darkgreen":"#006400", "darkkhaki":"#bdb76b", "darkmagenta":"#8b008b", "darkolivegreen":"#556b2f", "darkorange":"#ff8c00", "darkorchid":"#9932cc", "darkred":"#8b0000", "darksalmon":"#e9967a", "darkseagreen":"#8fbc8f", "darkslateblue":"#483d8b", "darkslategray":"#2f4f4f", "darkturquoise":"#00ced1", "darkviolet":"#9400d3", "deeppink":"#ff1493", "deepskyblue":"#00bfff", "dimgray":"#696969", "dodgerblue":"#1e90ff", "firebrick":"#b22222", "floralwhite":"#fffaf0", "forestgreen":"#228b22", "fuchsia":"#ff00ff", "gainsboro":"#dcdcdc", "ghostwhite":"#f8f8ff", "gold":"#ffd700", "goldenrod":"#daa520", "gray":"#808080", "green":"#008000", "greenyellow":"#adff2f",
        "honeydew":"#f0fff0", "hotpink":"#ff69b4", "indianred":"#cd5c5c", "indigo":"#4b0082", "ivory":"#fffff0", "khaki":"#f0e68c", "lavender":"#e6e6fa", "lavenderblush":"#fff0f5", "lawngreen":"#7cfc00", "lemonchiffon":"#fffacd", "lightblue":"#add8e6", "lightcoral":"#f08080", "lightcyan":"#e0ffff", "lightgoldenrodyellow":"#fafad2", "lightgrey":"#d3d3d3", "lightgreen":"#90ee90", "lightpink":"#ffb6c1", "lightsalmon":"#ffa07a", "lightseagreen":"#20b2aa", "lightskyblue":"#87cefa", "lightslategray":"#778899", "lightsteelblue":"#b0c4de", "lightyellow":"#ffffe0", "lime":"#00ff00", "limegreen":"#32cd32", "linen":"#faf0e6", "magenta":"#ff00ff", "maroon":"#800000", "mediumaquamarine":"#66cdaa", "mediumblue":"#0000cd", "mediumorchid":"#ba55d3", "mediumpurple":"#9370d8", "mediumseagreen":"#3cb371", "mediumslateblue":"#7b68ee", "mediumspringgreen":"#00fa9a", "mediumturquoise":"#48d1cc", "mediumvioletred":"#c71585", "midnightblue":"#191970", "mintcream":"#f5fffa", "mistyrose":"#ffe4e1", "moccasin":"#ffe4b5", "navajowhite":"#ffdead", "navy":"#000080", "oldlace":"#fdf5e6", "olive":"#808000", "olivedrab":"#6b8e23", "orange":"#ffa500", "orangered":"#ff4500", "orchid":"#da70d6", "palegoldenrod":"#eee8aa",
        "palegreen":"#98fb98", "paleturquoise":"#afeeee", "palevioletred":"#d87093", "papayawhip":"#ffefd5", "peachpuff":"#ffdab9", "peru":"#cd853f", "pink":"#ffc0cb", "plum":"#dda0dd", "powderblue":"#b0e0e6", "purple":"#800080", "rebeccapurple":"#663399", "red":"#ff0000", "rosybrown":"#bc8f8f", "royalblue":"#4169e1", "saddlebrown":"#8b4513", "salmon":"#fa8072", "sandybrown":"#f4a460", "seagreen":"#2e8b57", "seashell":"#fff5ee", "sienna":"#a0522d", "silver":"#c0c0c0", "skyblue":"#87ceeb", "slateblue":"#6a5acd", "slategray":"#708090", "snow":"#fffafa", "springgreen":"#00ff7f", "steelblue":"#4682b4", "tan":"#d2b48c", "teal":"#008080", "thistle":"#d8bfd8", "tomato":"#ff6347", "turquoise":"#40e0d0", "violet":"#ee82ee", "wheat":"#f5deb3", "white":"#ffffff", "whitesmoke":"#f5f5f5", "yellow":"#ffff00", "yellowgreen":"#9acd32"
    }

    onMount(() => {
        selectedColor = defaultColor
        
        colorEnabled.forEach((c) => {
            if (c.key === selectedColor) {
                c.value = true
            } else {
                c.value = false
            }
        })

        dispatch("colorSelected", selectedColor)
    })

    const onColorSelected = (color: string) => {
        selectedColor = color

        colorEnabled.forEach((c) => {
            if (c.key === color) {
                c.value = true
            } else {
                c.value = false
            }
        })

        dispatch("colorSelected", color)
    }

    const hexToRgb = (hex: string) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const componentToHex = (c: number) => {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    const rgbToHex = (color: {r: number, g: number, b: number}) => {
        return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
    }

    const getOppositeColor = (color: string) => {
        let colorRGB = hexToRgb(color) ? hexToRgb(color) as {r: number, g: number, b: number} : {r: 0, g: 0, b: 0}

        return rgbToHex({
            r: 255 - colorRGB.r,
            g: 255 - colorRGB.g,
            b: 255 - colorRGB.b
        })
    }
</script>

<div class="colorPickerWrapper">
    <strong>
        <h3 class="name" style="
            color: {selectedColor};
            background-color: {getOppositeColor(colorValues[selectedColor])};
            border: solid 1px {selectedColor};
        ">{name}</h3>
    </strong>
    <div class="colorPicker">
        {#each colorEnabled as color}
            <button on:click={() => onColorSelected(color.key)}>
                <ColorBox color={color.key} selected={color.value} />
            </button>
        {/each}
    </div>
</div>

<style lang="sass">
    .name
        color: white
        margin: 0
        padding-left: 32px
        padding-right: 32px
        border-padding: 8px
        transition: all 0.2s ease-in-out
        border-radius: 4px
        font-family: 'Impact', sans-serif

    .colorPicker
        display: flex
        flex-direction: row
        flex-wrap: wrap
        width: 100%
        height: 100%
        column-gap: 2px
        row-gap: 2px

        button
            background-color: transparent
            border: none
            outline: none
            width: 16px
            height: 16px
            padding: 0
            margin: 0

    .colorPickerWrapper
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 100%
        height: 100%
        row-gap: 8px
        border-top: solid 1px #333
        border-bottom: solid 1px #333
        padding-top: 8px
        padding-bottom: 8px
</style>