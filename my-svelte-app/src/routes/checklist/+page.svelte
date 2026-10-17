<script lang="ts">
    import ChecklistProgress from '$lib/assets/ChecklistProgress.svelte'
</script>

<h1 class="main-title" data-testid="title" >Progress Checklist</h1>

<ChecklistProgress/>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');


.main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #29232b;
    letter-spacing: -0.8px;
    margin-bottom: 20px;
    padding-bottom: 12px;
}
</style>
