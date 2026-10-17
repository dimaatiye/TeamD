<script module lang="ts">
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import ChecklistProgress from './ChecklistProgress.svelte';
	import { userEvent, expect } from 'storybook/test';

    const {Story} = defineMeta({
        title: 'Checklist/ChecklistProgress',
        component: ChecklistProgress
    });
</script>