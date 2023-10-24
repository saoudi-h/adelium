import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[megaMenu]',
    standalone: true,
    template: ` <li>
            <a>Formations</a>
            <ul>
                <li><a>Cours en ligne</a></li>
                <li><a>Ateliers pratiques</a></li>
                <li>
                    <a>Programmes de formation</a>
                    <ul>
                        <li><a>Développement web</a></li>
                        <li><a>Intelligence artificielle</a></li>
                        <li><a>Sécurité informatique</a></li>
                    </ul>
                </li>
                <li><a>Calendrier des formations</a></li>
            </ul>
        </li>
        <li>
            <a>Ressources pédagogiques</a>
            <ul>
                <li><a>Tutoriels en ligne</a></li>
                <li><a>Exercices pratiques</a></li>
                <li>
                    <a>Quiz d'évaluation</a>
                    <ul>
                        <li><a>Quiz de développement web</a></li>
                        <li><a>Quiz d'IA et machine learning</a></li>
                        <li><a>Quiz de sécurité informatique</a></li>
                    </ul>
                </li>
                <li><a>Blog</a></li>
            </ul>
        </li>
        <li>
            <a>À propos de nous</a>
            <ul>
                <li><a>Notre équipe</a></li>
                <li><a>Nos valeurs</a></li>
                <li><a>Nos partenaires</a></li>
            </ul>
        </li>
        <li>
            <a>Nous contacter</a>
            <ul>
                <li><a>Formulaire de contact</a></li>
                <li><a>Nos bureaux</a></li>
            </ul>
        </li>`,
    imports: [CommonModule],
})
export class MegaMenuComponent {}
