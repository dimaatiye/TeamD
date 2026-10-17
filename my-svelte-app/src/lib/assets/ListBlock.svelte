<label>
    <button 
        id={"block " + id}
        disabled={!enable}
        onclick={handleChange}
        data-testid="block-{id}"
    >{label}</button>
</label>

<script lang="ts">
  let {id, label, enable, onToggle=undefined} = $props();

  function handleChange() {
    onToggle?.({id, enable});
  }
</script>