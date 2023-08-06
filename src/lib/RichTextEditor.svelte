<script lang="ts">
    import { onMount } from 'svelte';
    import type { Readable } from 'svelte/store';
    import { createEditor, Editor, EditorContent, FloatingMenu, BubbleMenu } from 'svelte-tiptap';
    import StarterKit from '@tiptap/starter-kit';
	  import RichTextEditorFloatingMenu from './RichTextEditorFloatingMenu.svelte';
    import Highlight from '@tiptap/extension-highlight';
    import Underline from '@tiptap/extension-underline';
	  import LoadingAnimation from './LoadingAnimation.svelte';
    import TextStyle from '@tiptap/extension-text-style';
    import Color from '@tiptap/extension-color';
    import Placeholder from '@tiptap/extension-placeholder';
    import Typography from '@tiptap/extension-typography';
    import FontFamily from '@tiptap/extension-font-family';
    import CodeBlock from '@tiptap/extension-code-block';
    import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

    import {lowlight} from 'lowlight';
    import css from 'highlight.js/lib/languages/css'
    import js from 'highlight.js/lib/languages/javascript'
    import ts from 'highlight.js/lib/languages/typescript'
    import html from 'highlight.js/lib/languages/xml'
    import json from 'highlight.js/lib/languages/json'
    import python from 'highlight.js/lib/languages/python'
    import java from 'highlight.js/lib/languages/java'
    import cpp from 'highlight.js/lib/languages/cpp'
    import csharp from 'highlight.js/lib/languages/csharp'
    import php from 'highlight.js/lib/languages/php'
    import ruby from 'highlight.js/lib/languages/ruby'
    import go from 'highlight.js/lib/languages/go'
    import kotlin from 'highlight.js/lib/languages/kotlin'
    import swift from 'highlight.js/lib/languages/swift'
    import rust from 'highlight.js/lib/languages/rust'
    import sql from 'highlight.js/lib/languages/sql'
    import bash from 'highlight.js/lib/languages/bash'
    import dart from 'highlight.js/lib/languages/dart'
    import yaml from 'highlight.js/lib/languages/yaml'
    
    lowlight.registerLanguage('css', css)
    lowlight.registerLanguage('js', js)
    lowlight.registerLanguage('ts', ts)
    lowlight.registerLanguage('html', html)
    lowlight.registerLanguage('json', json)
    lowlight.registerLanguage('python', python)
    lowlight.registerLanguage('java', java)
    lowlight.registerLanguage('cpp', cpp)
    lowlight.registerLanguage('csharp', csharp)
    lowlight.registerLanguage('php', php)
    lowlight.registerLanguage('ruby', ruby)
    lowlight.registerLanguage('go', go)
    lowlight.registerLanguage('kotlin', kotlin)
    lowlight.registerLanguage('swift', swift)
    lowlight.registerLanguage('rust', rust)
    lowlight.registerLanguage('sql', sql)
    lowlight.registerLanguage('bash', bash)
    lowlight.registerLanguage('dart', dart)
    lowlight.registerLanguage('yaml', yaml)
  
    let editor: Readable<Editor>
    let editorLineNumber = 0
    let aiHistory: string[] = []
    let canSendNextAiRequest = true
    let aiResponseLoading = false
    let textColor = "blue"
  
    onMount(() => {

      editor = createEditor({
        extensions: [
          StarterKit, Highlight, Underline, 
          TextStyle, Color, Placeholder.configure({
            placeholder: 'Use /ai to talk to the AI. Otherwise just type away!'
          }), 
          Typography, FontFamily, CodeBlock, CodeBlockLowlight.configure({
            lowlight,
            defaultLanguage: 'javascript',
          }),
      ],
        content: ``,
        editorProps: {
          attributes: {
            class: `tiptap ${$$props.class}`,
          },
        },
      });

      $editor.on('update', () => {
        let lines = $editor.getText().split('\n\n');

        if (lines.length > editorLineNumber) {
          if (editorLineNumber <= 0) {
            newLineAdded(lines[editorLineNumber], lines)
          } else {
            newLineAdded(lines[editorLineNumber - 1], lines)
          }

          editorLineNumber = lines.length;
        }
      })
    });

    const newLineAdded = async (line: string, lines: string[]) => {
      console.log(line)

      if (line.startsWith('/ai') && canSendNextAiRequest) {
        let command = line.substring(4)

        aiResponseLoading = true
        canSendNextAiRequest = false

        let aiResponse = await getAiResponse(command, aiHistory, (response: string) => {
          lines.splice(lines.indexOf(line), 1)
          lines = lines.concat(response.split('\n\n'))

          $editor.chain().focus().clearContent().run()

          for (let line in lines) {
            $editor.chain().focus().insertContent(`<p>${lines[line]}</p>`).run();
          }
        });

        aiHistory.push(aiResponse)

        setTimeout(() => {
          aiResponseLoading = false
          canSendNextAiRequest = true
        }, 1000)
      }
    }

    const getAiResponse = async (command: string, history?: string[], _callback?: any) => {
      let aiResponses = await (await fetch(`/api/openai?message=${aiHistory.join('\n\n')} ${command}`, {
        method: "GET",
      })).json();

      _callback(aiResponses[0].message.content);

      return aiResponses[0].message.content;
    }

    export const getEditor = () => {
      return $editor;
    }

    export const getEditorContentJSON = () => {
      return $editor.getJSON();
    }

    const onTextColorChange = (color: any) => {
      textColor = color.detail;
      $editor.chain().focus().run();
      $editor.commands.setColor(textColor)
    }

</script>

{#if editor}
  <BubbleMenu editor={$editor}>
    <RichTextEditorFloatingMenu editor={$editor} on:textColorChange={onTextColorChange}/>
  </BubbleMenu>

  <FloatingMenu editor={$editor}>
    <RichTextEditorFloatingMenu editor={$editor} on:textColorChange={onTextColorChange}/>
  </FloatingMenu>
{/if}

<EditorContent editor={$editor}/>

{#if aiResponseLoading}
  <div class="aiResponseLoading">
    <LoadingAnimation/>
  </div>
{/if}
    
<style lang="sass">
  :global(.tiptap)
    &:focus
        border-color: #aaa
        outline: none

  :global(.tiptap *)
    margin: 0

  :global(.tiptap blockquote)
    border-left: 4px solid #333
    padding-left: 32px
    border-radius: 4px
    background-color: #eee
    padding-top: 16px
    padding-bottom: 16px
  
  :global(.tiptap pre)
    background-color: #333
    padding: 8px
    border-radius: 4px
    font-family: 'Roboto Mono'
    font-size: 0.85em
    color: #fff

  :global(.tiptap code)
    background: none
    color: inherit
    font-size: 0.8rem
    padding: 0

  :global(.tiptap li)
    margin-left: 16px

  .aiResponseLoading
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    position: sticky
    top: 25vh

  :global(.tiptap p.is-empty::before)
    color: #adb5bd
    content: attr(data-placeholder)
    float: left
    height: 0
    pointer-events: none

</style>
