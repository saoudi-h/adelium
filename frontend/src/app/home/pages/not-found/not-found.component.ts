import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SvgNotFoundComponent } from './svg-not-found.component'

@Component({
    selector: 'app-not-found',
    template: ` <section class="container mx-auto flex h-full">
        <div class="hero mb-12 mt-8 sm:mt-20">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div
                    class="flex w-full flex-col items-center justify-center text-center lg:w-1/2 lg:px-2 xl:px-0">
                    <h1 class="font-serif text-res-big">
                        <p
                            class="text-6xl font-bold tracking-wider text-accent md:text-7xl lg:text-8xl">
                            404
                        </p>
                        <p class="font-serif text-res-h1 font-bold">
                            Page introuvable.
                        </p>
                    </h1>
                    <p
                        class="py-4 font-light text-base-content/60 md:text-lg xl:text-2xl">
                        Sorry, the page you are looking for could not be found.
                    </p>
                    <a class="btn btn-primary btn-lg font-normal">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-2 h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Retourner a l'acceuil</span>
                    </a>
                </div>
                <div
                    class="flex w-1/2 max-w-xl justify-center p-4 lg:h-full lg:items-end">
                    <app-svg-not-found />
                </div>
            </div>
        </div>
    </section>`,
    standalone: true,
    imports: [CommonModule, SvgNotFoundComponent],
})
export class NotFoundComponent {}
