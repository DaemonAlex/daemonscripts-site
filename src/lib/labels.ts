import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export const categoryLabels = {
    platform: 'Platforms',
    fivem: 'FiveM scripts',
    tool: 'Tools',
} as const;

export const categoryOrder = ['platform', 'fivem', 'tool'] as const;

export const areaLabels = {
    jobs: 'Jobs',
    city: 'City systems',
    'police-ems': 'Police & EMS',
    vehicles: 'Vehicles',
    world: 'World',
    admin: 'Staff tools',
    player: 'Player',
    library: 'Library',
} as const;

export const statusLabels = {
    live: 'Live',
    beta: 'Beta',
    planning: 'Planning',
    archived: 'Archived',
} as const;

/** Category first, then the page's own order, then the title. */
export function sortProjects(a: Project, b: Project): number {
    const category = categoryOrder.indexOf(a.data.category) - categoryOrder.indexOf(b.data.category);
    if (category !== 0) return category;
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return a.data.title.localeCompare(b.data.title);
}
