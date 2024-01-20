import { Component } from '@angular/core'

@Component({
    selector: '[about-page]',
    template: `
        <div class="container prose mx-auto px-4">
            <header class="my-10 text-center">
                <h1 class="font-serif text-4xl font-bold text-primary">
                    À Propos d'Adelium
                </h1>
                <p
                    class="font-light italic text-base-content md:text-base xl:text-lg">
                    Innovation et Expertise en Formation Informatique
                </p>
            </header>

            <section>
                <h2
                    class="font-serif text-base font-bold md:text-lg xl:text-xl">
                    Notre Histoire
                </h2>
                <p
                    class="font-sans font-light text-base-content/60 md:text-base xl:text-lg">
                    Fondée en 2015, Adelium IT s'est rapidement imposée comme
                    une référence dans le domaine de la formation informatique,
                    offrant une gamme complète de cours et de services adaptés
                    aux professionnels et aux entreprises.
                </p>
            </section>

            <section class="mt-6">
                <h2
                    class="font-serif text-base font-bold md:text-lg xl:text-xl">
                    Notre Mission
                </h2>
                <p
                    class="font-light text-base-content/60 md:text-base xl:text-lg">
                    Notre mission est d'habiliter nos clients par le
                    savoir-faire technologique, en fournissant des formations de
                    qualité, innovantes et pertinentes pour le monde
                    professionnel d'aujourd'hui et de demain.
                </p>
            </section>

            <section class="mt-6">
                <h2
                    class="font-serif text-base font-bold md:text-lg xl:text-xl">
                    Pourquoi Nous Choisir
                </h2>
                <ul
                    class="list-discfont-light mt-2 list-inside text-base-content/60 md:text-base xl:text-lg">
                    <li>Expertise sectorielle et approche personnalisée</li>
                    <li>Cours dispensés par des professionnels expérimentés</li>
                    <li>
                        Utilisation des dernières technologies et méthodologies
                        d'enseignement
                    </li>
                </ul>
            </section>
        </div>
    `,
    standalone: true,
})
export class AboutComponent {}
