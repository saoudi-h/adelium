import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FacebookComponent } from '../icons/facebook.component'
import { InstagramComponent } from '../icons/instagram.component'
import { LinkedinComponent } from '../icons/linkedin.component'
import { YoutubeComponent } from '../icons/youtube.component'
import { LogoWidgetComponent } from '../widgets/logo/logo.component'

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
        LogoWidgetComponent,
        FacebookComponent,
        InstagramComponent,
        YoutubeComponent,
        LinkedinComponent,
    ],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    footer = {
        header: {
            logo: {
                route: '/',
            },
            description: `Découvrez votre futur dans l'informatique avec nos formations en ligne. 
            Explorez les dernières technologies et compétences du secteur pour booster votre carrière.`,
        },
        main: {
            sections: [
                {
                    title: 'À propos',
                    links: [
                        { label: 'Notre mission', url: '#' },
                        { label: 'Nos formateurs', url: '#' },
                        { label: 'Témoignages', url: '#' },
                    ],
                },
                {
                    title: 'Formations',
                    links: [
                        { label: 'Développement Web', url: '#' },
                        { label: 'Intelligence Artificielle', url: '#' },
                        { label: 'Cybersécurité', url: '#' },
                        { label: 'Data Science', url: '#' },
                    ],
                },
                {
                    title: 'Ressources',
                    links: [
                        { label: 'Blog', url: '#' },
                        { label: 'Événements', url: '#' },
                        { label: 'Webinaires', url: '#' },
                        { label: 'Études de cas', url: '#' },
                    ],
                },
                {
                    title: 'Support',
                    links: [
                        { label: 'FAQ', url: '#' },
                        { label: 'Contactez-nous', url: '#' },
                        { label: 'Conditions d’utilisation', url: '#' },
                        { label: 'Politique de confidentialité', url: '#' },
                    ],
                },
            ],
            newsLetter: {
                title: 'Restez informé',
                description: `Abonnez-vous à notre newsletter pour les dernières actualités du secteur et des mises à jour sur nos formations.`,
                form: {
                    placeholder: 'Votre adresse email',
                    buttonLabel: "S'inscrire",
                },
            },
        },
        bottom: {
            copyright: 'Copyright © 2023. Tous droits réservés.',
            socials: [
                {
                    name: 'facebook',
                    url: '#',
                },
                {
                    name: 'instagram',
                    url: '#',
                },
                {
                    name: 'linkedin',
                    url: '#',
                },
                {
                    name: 'youtube',
                    url: '#',
                },
            ],
        },
    }
}
