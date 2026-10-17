<script lang="ts">
    import ChecklistItem from '$lib/assets/ChecklistItem.svelte'
    import { writable, derived } from 'svelte/store';
    import { Tween } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
	import {checklist, blocktype, percent, completed} from '$lib/assets/checklist.svelte'
    import type {Item, Block} from '$lib/assets/checklist.svelte'
    import {onMount, tick} from 'svelte';
    import ListBlock from './ListBlock.svelte';
    
    let percentage = $state(0);
    let selectedBlock = $state<number | null>(null);// is it null or number

    const checklists: Item[][] = [[
        {id: "1", label: "I can write a Playwrite test that navigates to a route and asserts an element's text content", done:false},
        {id: "2", label: "I can run Playwrite tests from the command line and read the output", done:false}
       
    ],
    [
         {id: "3", label: "I can write a test that fails first, then write a minimum code to make it pass", done:false},
        {id: "1", label: "I can select elemts by data-testid, by role (getByRole), and by label - and I know when to prefer each.", done:false},
       
    ],
    [
        {id: "2", label: "I can explain why getByRole('checkbox') will throw in strict mode if multiple checkboxes exist and how to fix it", done:false},
        {id: "3", label: "I can write a test that clicks a checkbox and assets the result (checked state, counter update", done:false}
  
    ],
    [
        {id: "1", label: "Checklist 4", done:false},
        {id: "2", label: "Checklist 4", done:false},
        {id: "3", label: "Checklist 8", done:false},
        {id: "4", label: "Checklist 9", done:false},
        {id: "5", label: "Checklist 10", done:false}
    ],
    [
        {id: "1", label: "Checklist 5", done:false},
        {id: "2", label: "Checklist 5", done:false},
        {id: "3", label: "Checklist 8", done:false},
        {id: "4", label: "Checklist 9", done:false},
        {id: "5", label: "Checklist 10", done:false}
    ],
  [
        {id: "1", label: "Checklist 4", done:false}
    ],
    [
        {id: "1", label: "Checklist 4", done:false},
        {id: "2", label: "Checklist 4", done:false},
        {id: "3", label: "Checklist 8", done:false}
    ],
    [
        {id: "1", label: "Checklist 4", done:false},
        {id: "2", label: "Checklist 4", done:false}
    ],
    [
        {id: "1", label: "Checklist 4", done:false},
        {id: "2", label: "Checklist 4", done:false}
    ],
    [
        {id: "1", label: "Final", done:false}
    ]];

    const max = checklists.length;

   //let {initialItems = defaultItems}: { initialItems?: Item[]} = $props();

    onMount(() => {
        //checklist.items = initialItems.map((i) => ({...i}));
       // blocktype.blocks = blocks.map((i) => ({...i}));
    })

    let liveCount = $derived(checklist.items.filter((i) => i.done).length);
   //let {initialItems = defaultItems}: { initialItems?: Item[]} = $props();

    //onMount(() => {
      //  checklist.items = initialItems.map((i) => ({...i}));
   // })
//
    //let liveCount = $derived(checklist.items.filter((i) => i.done).length);
    let activeCount = $state(0);
   // let total = $derived(checklist.items.filter((i) => i).length)
    let total = checklists.length;
    const progressBar = new Tween(0, {duration: 1000, easing: cubicOut});

    function updateCurrent() {
        if (selectedBlock === null) return;
        const currentChecklist = checklists[selectedBlock];
        const allDone = currentChecklist.every((item) => item.done);
            if (allDone) {
        activeCount = checklists.filter((list) =>
            list.every((item) => item.done)
        ).length;
        console.log(checklists.length);
        percentage = Math.round((activeCount / checklists.length) * 100);
        progressBar.set(percentage);
        unlockNext(selectedBlock);
    }
}

    function unlockNext(index: number) {
        let next = index + 1;

        if (next < checklists.length)
        {
            let block = <HTMLButtonElement>document.getElementById("block " + next.toString());
            block.disabled = false;
        }
    }

    function selectBlock(id: number) {//remeber wich block is clicked
        selectedBlock = id;

        let title = <HTMLHeadingElement>document.getElementById("title");
            
        if (id == max + 1)
        {
            title.textContent = "Svelte";
        }
        else
        {
            title.textContent = "TDD with Playwright";
        }
    }
    
</script>

<div>
    <h2 id="title">TDD with Playwright</h2>
    <h3>Total XP</h3>
    <progress value={progressBar.current / 100} id="AnimatedBar" data-testid="progressStatic"></progress>
</div><br>

<div class="scrollbar">
    {#each {length : max} as t, i}
        {#if i == 0}
            <ListBlock label={"Block " + (i + 1).toString()}  id={i.toString()} onToggle={() => selectBlock(i)} enable={true}></ListBlock>
        {:else}
            <ListBlock label={"Block " + (i + 1).toString()}  id={i.toString()} onToggle={() => selectBlock(i)} enable={false}></ListBlock>
        {/if}
        {/each}
    <ListBlock label={"Block Next"}  id={max + 1} onToggle={() => selectBlock(max + 1)} enable={true}></ListBlock>


</div>

<h2 data-testid="counter" role="status">Tasks</h2>
{#if selectedBlock !== null} 
    {#each checklists[selectedBlock] as item (item.id)}
        <ChecklistItem id={item.id} label={item.label} bind:done={item.done}></ChecklistItem><br>
    {/each}
    <button onclick={updateCurrent} data-testid="submit">Submit</button>

{/if}
<style>
    progress{
        display:flex;
        align-items: flex-end;
        float:left;
        width: 450px;
        height: 10;
    }
    #AnimatedBar{
        color:rgb(255, 163, 178);
    }
    div.scrollbar {
        width: 70px;
        height: 50px;
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        padding-right: 20%;
    }
</style>