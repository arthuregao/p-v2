
export default function About() {
    return(
        <section
            id={'about'}
            className={'class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"'}
        >
            <div className={'class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"'}>
                <h2 className={'text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only'}>About Me</h2>
            </div>
            <div>
                <p className={'mb-4'}>
                    I recently graduated with a Computer Science degree, focusing on projects that blend user interaction with cutting-edge technology. One notable project was a smart chess board I developed using embedded Rust, which automatically identifies piece positions and suggests valid moves to players. My enthusiasm for embedded development drives me to create practical, innovative solutions.
                </p>
                <p className={'mb-4'}>
                    I’m looking for opportunities to bring my skills to a team that values groundbreaking work in embedded systems.
                </p>
            </div>
        </section>
    )
}