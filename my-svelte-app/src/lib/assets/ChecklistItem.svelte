<label>
    {label}
    <input 
        type="checkbox"
        id={id}
        bind:checked={done}
        onchange={handleChange}
        data-testid="checkbox-{id}"
    >
</label>

<script lang="ts">
  //import {itemsStore} from '$lib/assets/ChecklistProgress.svelte';

  let {id, label, done = $bindable(false), onToggle=undefined} = $props();

  function handleChange() {
  //  const current = event.currentTarget as HTMLInputElement;

  //  itemsStore.update(items => items.map(item => item.id === id ? {...item, done: current.checked} : item));
    onToggle?.({id, done});
  }
</script>