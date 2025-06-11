function ExperienceBox(props: { time: string; role: string; company: string; description: string, link: string }) {

    const {time, role, company, description, link} = props

    return (
        <div
            className={'group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50'}>
            <div
                className={'absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg'}>

            </div>
            <header
                className={'z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'}>
                {time}
            </header>
            <div className={'z-10 sm:col-span-6'}>
                <h3 className={'font-medium leading-snug text-slate-200'}>
                    <div>
                        <a
                            href={link}
                            className={'inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base'}
                        >
                                            <span
                                                className={'absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block'}/>

                            {role} ·
                            <span className={'inline-block ml-1'}>{company}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                     fill="currentColor"
                                     className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                     aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                                          clip-rule="evenodd">

                                                </path>
                                                </svg>
                                            </span>

                        </a>
                    </div>
                </h3>
                <p className={'mt-2 text-sm leading-normal'}>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default function Experience() {
    return (
        <section id={'experience'} className={'mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24'}>
            <div
                className={'sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0'}/>
            <div>
                <ol className={'group/list'}>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time={'Sept 2024 - Present'}
                            role={'Junior Computer Person'}
                            company={'Pickford AI'}
                            description={'Turning code into campfire stories'}
                            link={'https://pickford.ai'}
                        />
                    </li>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time={'Feb 2024 - Sept 2024'}
                            role={'Research Assistant'}
                            company={'University of Toronto'}
                            link={'https://www.law.utoronto.ca'}
                            description={'Developed and refined various data parsing methods and algorithms to parse semi-structured data into consistently structured data enabling further research.'}/>
                    </li>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time='Winter Semester 2023 & 2024'
                            role='CSC258 Teaching Assistant'
                            company='University of Toronto'
                            link={'https://cs.toronto.edu'}
                            description='Provided technical support to students by troubleshooting labs, grading tests, and answering questions on digital logic and MIPS assembly.'
                        />
                    </li>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time={'May - Sept 2023'}
                            role={'Web Developer'}
                            company={'Bank of Canada'}
                            link={'https://bankofcanada.ca'}
                            description={'Worked on the web team developing new features and performing bug fixes for all external and internal bank websites in an Agile development environment.'}
                        />
                    </li>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time={'2022 - 2024'}
                            role={'Director of Safety'}
                            company={'U of T Ski and Snowboard Club'}
                            description={'As Director of Safety for the University of Toronto Ski and Snowboard Club, I spearheaded an eight-member Crisis Management Response Team, ensuring readiness for challenges at large-scale ski events. My ability to think decisively under pressure was essential in rapidly implementing solutions to unforeseen trip complications, positively impacting the experience of over 1000 attendees.'}
                            link={'https://utssc.com'}
                        />
                    </li>
                    <li className={'mb-12'}>
                        <ExperienceBox
                            time={'June - Sept 2021'}
                            role={'Director of Video'}
                            company={'National Stiltwalkers of Canada'}
                            description={'Directed the photography and software development for two live shows reaching over 5000 live viewers.'}
                            link={'https://www.nationalstiltwalkersofcanada.com'}
                        />
                    </li>
                </ol>
            </div>
        </section>
    )
}