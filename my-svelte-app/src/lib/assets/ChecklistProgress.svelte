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
        {id: "1", label: "I know how to open my laptop", done:false},
        {id: "2", label: "I know how to wash the dishes", done:false}
       
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
        const totalTasks = checklists.reduce(
            (sum, list) => sum + list.length, 0
        );
        const completedTasks = checklists.reduce(
            (sum, list) => sum + list.filter(item => item.done).length, 0
        );
            //console.log(checklists.length);
        percentage = Math.round((completedTasks / totalTasks) * 100);
        progressBar.set(percentage);
            
        if (selectedBlock !== null) {
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
            title.textContent = "Recent Groups";
        }
    }
    
    
</script>

<div>
    <h2 id="title">Recent Groups</h2>
</div><br>


<div class="progress-container">
    <progress
        id="AnimatedBar"
        value={progressBar.current}
        max="100"
    ></progress>
</div>


<div class="scrollbar">
    {#each {length : max} as t, i}
        {#if i == 0}
            <ListBlock label={"Topic " + (i + 1).toString()}  id={i.toString()} onToggle={() => selectBlock(i)} enable={true}></ListBlock>
        {:else}
            <ListBlock label={"Topic " + (i + 1).toString()}  id={i.toString()} onToggle={() => selectBlock(i)} enable={false}></ListBlock>
        {/if}
        {/each}
    <ListBlock label={"end"}  id={max + 1} onToggle={() => selectBlock(max + 1)} enable={true}></ListBlock>


</div>
{#if selectedBlock !== null}
<h2 data-testid="counter" role="status">Tasks</h2>
 
    {#each checklists[selectedBlock] as item (item.id)}
        <ChecklistItem id={item.id} label={item.label} bind:done={item.done}></ChecklistItem><br>
    {/each}
    <button onclick={updateCurrent} data-testid="submit">Submit</button>

{/if}
<style>
    .progress-container {
        width: 450px;
        margin-bottom: 20px;
    }

    progress{
        display:block;
        align-items: flex-end;
        float:left;
        width: 450px;
        height: 10;
    }

    progress::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 10px;
}

    progress::-webkit-progress-value {
        background-color: rgb(255, 163, 178);
        border-radius: 10px;
    }

    progress::-moz-progress-bar {
        background-color: rgb(255, 163, 178);
        border-radius: 10px;
    }
    #AnimatedBar{
        color:rgb(255, 163, 178);
    }
    /*
    div.scrollbar {
        width: 670px;
        height: 50px;
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        padding-right: 20%;
    }*/

    
</style>