import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { ProjectsGallery, type HydratedProject } from '../../components/projects-gallery';
import { SwatchChip } from '../../components/art/swatch-chip';
import { TapeRule } from '../../components/art/rules';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { getColour } from '../../content/colours';
import { coloursUsedInProjects, projects } from '../../content/projects';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Recent interior, exterior and commercial painting projects across Edinburgh and the Lothians, with the exact house colour swatches used on each job.',
  alternates: { canonical: absoluteUrl('/projects/') },
};

export default function ProjectsPage() {
  const hydratedProjects: HydratedProject[] = projects.map(project => ({
    ...project,
    resolvedColours: project.colours.map(getColour),
  }));

  const usedColours = coloursUsedInProjects(projects).map(({ colourId, projects: usedBy }) => ({
    colour: getColour(colourId),
    projects: usedBy,
  }));

  return (
    <>
      <PageHead
        eyebrow="Project gallery"
        title={
          <>
            Recent work, <em>colour</em> by colour
          </>
        }
        below={
          /* Continuous strip of all project colours under the page title */
          <div className="border-y border-line py-3">
            <p className="eyebrow mb-2.5">Swatches across these jobs</p>
            <ul className="flex flex-wrap gap-2">
              {usedColours.map(({ colour }) => (
                <li
                  key={colour.id}
                  className="inline-flex items-center gap-2 rounded-xs border border-line bg-surface px-2.5 py-1"
                >
                  <span
                    className="swatch-well h-4 w-4 shrink-0"
                    style={{ backgroundColor: colour.hex }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    {colour.code}
                  </span>
                  <span className="font-serif text-sm text-ink">{colour.name}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <p>
          Nine recent decorating jobs from Leith to Linlithgow. Every card shows the preparation
          involved, how many days it took, and the house swatches brushed onto the walls and trim.
        </p>
      </PageHead>

      <ProjectsGallery projects={hydratedProjects} />

      {/* "The colours we used": full chip wall of every colour referenced by a project */}
      <section aria-labelledby="colours-used-heading" className="dust-band border-t border-line py-16 lg:py-20">
        <div className="wrap">
          <TapeRule label="Chip wall" className="mb-4 max-w-xs" />
          <h2
            id="colours-used-heading"
            className="font-serif text-[clamp(2.3rem,4.5vw,3.5rem)] leading-none text-ink"
          >
            The colours we used
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Every shade featured in the projects above. Select a project name to jump back to its card.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {usedColours.map(({ colour, projects: usedBy }) => (
              <li key={colour.id} className="flex flex-col">
                <SwatchChip colour={colour} size="md" note={colour.note} className="flex-1" />
                <ul className="border-x border-b border-line bg-bg px-3 py-2.5 text-xs">
                  {usedBy.map(project => (
                    <li key={project.id} className="py-0.5">
                      <a href={`#project-${project.id}`} className="text-link">
                        {project.title}
                      </a>
                      <span className="ml-1.5 font-mono text-[0.65rem] uppercase text-muted">
                        ({project.area})
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="wrap py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-t-2 border-ink/80 pt-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none text-ink">
              Want to see real brush-outs in your room?
            </h2>
            <p className="mt-2.5 max-w-xl text-base text-muted">
              Note any BC swatch codes that catch your eye and we&rsquo;ll bring painted sample cards
              along to the quote visit.
            </p>
          </div>
          <SiteLink href="/contact/" className="button shrink-0">
            {business.enquiries.title}
          </SiteLink>
        </div>
      </section>
    </>
  );
}
