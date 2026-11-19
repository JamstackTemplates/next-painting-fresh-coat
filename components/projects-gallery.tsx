'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import type { Colour } from '../content/colours';
import type { Project } from '../content/projects';
import type { ServiceCategory } from '../content/services';
import { SceneVignette } from './art/scene-vignette';
import { MiniSwatchFan } from './art/swatch-chip';

type FilterValue = 'all' | ServiceCategory;

const TABS: readonly { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'interior', label: 'Interior' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'commercial', label: 'Commercial' },
];

function parseCategory(raw: string | null): FilterValue {
  if (raw === 'interior' || raw === 'exterior' || raw === 'commercial') return raw;
  return 'all';
}

export interface HydratedProject extends Project {
  resolvedColours: readonly Colour[];
}

export function ProjectsGallery({ projects }: { projects: readonly HydratedProject[] }) {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<FilterValue>('all');

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    setCategory(parseCategory(params.get('category')));
  }, []);

  function selectCategory(next: FilterValue) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', next);
    }
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = TABS.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const target = TABS[nextIndex];
      selectCategory(target.value);
      const el = document.getElementById(`project-tab-${target.value}`);
      el?.focus();
    }
  }

  const visible = category === 'all' ? projects : projects.filter(p => p.category === category);

  return (
    <section aria-label="Completed projects" className="wrap pb-16">
      {/* Filter controls appear only after hydration so no-JS shows all projects cleanly */}
      {mounted ? (
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div
            role="tablist"
            aria-label="Filter projects by service category"
            className="flex flex-wrap gap-2"
          >
            {TABS.map((tab, index) => {
              const selected = category === tab.value;
              return (
                <button
                  key={tab.value}
                  id={`project-tab-${tab.value}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="projects-grid-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectCategory(tab.value)}
                  onKeyDown={e => handleTabKeyDown(e, index)}
                  className={`min-h-10 rounded-ui border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                    selected
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-line bg-surface text-ink hover:border-ink hover:bg-dust'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted" role="status" aria-live="polite">
            Showing {visible.length} of {projects.length} projects
          </p>
        </div>
      ) : null}

      {/* Masonry-like grid: every 3rd card spans 2 columns on desktop */}
      <div
        id="projects-grid-panel"
        role={mounted ? 'tabpanel' : undefined}
        aria-labelledby={mounted ? `project-tab-${category}` : undefined}
        className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, index) => {
          const isWide = (index + 1) % 3 === 0;
          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className={`swatch-chip flex flex-col overflow-hidden ${
                isWide ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Top: Scene vignette painted in project's colours + mini fan */}
              <div className="relative border-b border-line bg-dust">
                <SceneVignette
                  scene={project.scene}
                  hexes={project.resolvedColours.map(c => c.hex)}
                  title={project.title}
                />
                <div className="absolute bottom-2 right-3">
                  <MiniSwatchFan colours={project.resolvedColours} />
                </div>
              </div>

              {/* Middle: Title, metadata and summary */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                  <span>{project.area} · {project.year}</span>
                  <span>
                    {project.category} · {project.days} {project.days === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
              </div>

              {/* Bottom: Stacked paint-chip bands showing code & name */}
              <div className="border-t border-line bg-bg/60 p-4">
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {project.resolvedColours.map(colour => (
                    <li
                      key={colour.id}
                      className="flex items-center gap-2.5 rounded-xs border border-line bg-surface p-1.5"
                    >
                      <span
                        className="swatch-well h-8 w-8 shrink-0"
                        style={{ backgroundColor: colour.hex }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 leading-tight">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                          {colour.code}
                        </span>
                        <span className="block truncate font-serif text-base text-ink">
                          {colour.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
