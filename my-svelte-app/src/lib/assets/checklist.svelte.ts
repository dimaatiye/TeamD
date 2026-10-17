export type Item = {id: string, label: string, done: boolean};
export type Block = {id: number, enabled: boolean};

export const checklist = $state({
    items: [] as Item[]
})

export const blocktype = $state({
    blocks: [] as Block[]
})

export function completed(){
    return checklist.items.filter((i) => i.done).length;
}

export function percent() {
    const total = checklist.items.length;
    return total ? Math.round((100 * completed()) / total) : 0;
}