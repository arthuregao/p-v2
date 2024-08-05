import {intersection} from "ts-interface-checker";

export default function Projects() {


    function Project(props: { link: string; project_name: string; project_description: string; image_path: string; image_alt: string; }) {
        const {link, project_name, project_description, image_path, image_alt} = props

        return (
            <div
                className={'group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50'}>
                <div
                    className={'absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg'}/>
                <div className={'z-10 sm:order-2 sm:col-span-6'}>
                    <h3 className={''}>

                        <a
                            href={link}
                            className={'inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base'}
                        >
                                                <span
                                                    className={'absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block'}/>

                            {project_name}
                            <span className={'inline-block'}>
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

                    </h3>
                    <p className={'mt-2 text-sm leading-normal'}>
                        {project_description}
                    </p>
                </div>

                <img src={image_path} alt={image_alt}
                     className={'rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1'}/>
            </div>
        )
    }


    return (
        <section id="projects" className={'mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24'}>
            <div
                className={'sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0'}>
                <h2 className={'text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only'}>Projects</h2>
            </div>

            <div>
                <ul className={'group/list'}>
                    <li className={'mb-12'}>
                        <Project link={'/projects/chess'} project_name={'Embedded Chess'} project_description={'An embedded chess project that incorprated a custom PCB with 3D printed parts and software written in Rust to create a chessboard that detects the position of pieces and highlights possible moves when a piece is picked up'} image_path={'/chess.webp'} image_alt={'A 3D printed embedded chess board'} />
                    </li>
                    <li className={'mb-12'}>
                        <Project link={'/projects/projection'} project_name={'Projection Mapping'} project_description={'A software project to lower the barrier of entry to animated storytelling. We developed an application that allows upper elementary and middle school aged students access to animation and projection mapping as a medium for storytelling. This project is being developed for test runs in Toronto classrooms.'} image_path={'/projection.webp'} image_alt={'Projection Mapping Demo'} />
                    </li>
                    <li className={'mb-12'}>
                        <Project link={'/projects/parsing'} project_name={'GPT Parsing'} project_description={'A research project involving counsels petitioning for cases to SCOTUS. The data gathered had a semi-formatted \'counsels\' field and as such required parsing. We ran the data through a parsing algorithm that involved GPT-4, extracting formatted data from the dataset to do further research on. '} image_path={'/ChatGPT_logo.svg'} image_alt={'ChatGPT logo'}/>
                    </li>
                </ul>
            </div>
        </section>
    )
}