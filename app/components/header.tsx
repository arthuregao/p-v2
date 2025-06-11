
export default function Header() {
    return(
        <header
            id={'header'}
            className={'lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24'}
        >
            <div>
                <h1 className={'text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl'}>
                    <a href="/">Arthur Gao</a>
                </h1>
                <h2 className={'mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl'}>
                    Turning code into campfire stories
                </h2>
                <p className={'mt-4 max-w-xs leading-normal'}>
                    I design innovative computing experiences!
                </p>
                <nav className={'nav hidden lg:block'}>
                    <ul className={'mt-16 w-max'}>
                        <li>
                            <a href="#about">
                                <span
                                    className={'nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none'}/>
                                <span
                                    className={'nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200'}>About</span>
                            </a>
                        </li>
                        <li>
                            <a href="#projects">
                                <span
                                    className={'nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none'}/>
                                <span
                                    className={'nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200'}>Projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="#experience">
                                <span
                                    className={'nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none'}/>
                                <span
                                    className={'nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200'}>Experience</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}