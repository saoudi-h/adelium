### Cas d'Utilisation : Consultation des Offres

- **Acteurs** : Visiteur, Organisme
- **Description** : Un visiteur ou un organisme souhaite consulter les offres de formation disponibles sur le LMS.
- **Flux** :
    1. L'utilisateur accède à la page d'accueil du LMS.
    2. Sur la page d'accueil, il peut parcourir les offres de formation sans authentification.
    3. L'utilisateur peut choisir de filtrer les formations par domaine, durée, modalité d'enseignement, gratuité, et disponibilité pour le CPF.
    4. S'il est intéressé par une formation, il peut cliquer dessus pour obtenir plus de détails.
    5. Les détails de la formation incluent sa description, son coût éventuel, sa durée, et d'autres informations pertinentes.

### Cas d'Utilisation : Demande de Devis

- **Acteurs** : Organisme
- **Description** : Un organisme souhaite demander un devis pour une formation sur mesure.
- **Flux** :
    1. L'organisme accède au LMS en tant que visiteur ou utilisateur authentifié.
    2. L'organisme navigue vers la page de demande de devis.
    3. Il remplit un formulaire en ligne, en spécifiant ses besoins de formation.
    4. Après avoir soumis le formulaire, l'organisme reçoit une confirmation de réception de sa demande.

### Cas d'Utilisation : Création d'un Cours

- **Acteurs** : Formateur
- **Description** : Un formateur souhaite créer un nouveau cours sur le LMS.
- **Flux** :
    1. Le formateur se connecte à son compte sur le LMS.
    2. Il accède à la section de création de cours.
    3. Le formateur renseigne les informations du cours, telles que le titre, la description, et les caractéristiques (gratuit ou payant, en ligne ou en présentiel, etc.).
    4. Il peut ajouter des sections, des articles, des vidéos, des ressources téléchargeables, et des évaluations au cours.
    5. Le formateur peut également inviter d'autres formateurs à collaborer sur le cours en leur attribuant des rôles spécifiques.

### Cas d'Utilisation : Inscription à un Cours

- **Acteurs** : Stagiaire
- **Description** : Un stagiaire souhaite s'inscrire à un cours sur le LMS.
- **Flux** :
    1. Le stagiaire se connecte à son compte sur le LMS.
    2. Il parcourt les formations disponibles et sélectionne un cours qui l'intéresse.
    3. Le stagiaire s'inscrit au cours en suivant le processus d'inscription.
    4. Une fois inscrit, il peut accéder au contenu du cours, suivre les sections, passer des quiz et évaluations, et recevoir des commentaires sur ses performances.

### Cas d'Utilisation : Gestion des Rôles et des Autorisations

- **Acteurs** : Administrateur
- **Description** : L'administrateur du LMS gère les rôles et les autorisations des utilisateurs.
- **Flux** :
    1. L'administrateur se connecte à son compte sur le LMS.
    2. Il accède à l'interface d'administration.
    3. L'administrateur peut attribuer, modifier ou révoquer les rôles des utilisateurs (root, admin, formateurs, stagiaires).
    4. Il gère les autorisations spécifiques pour chaque rôle, garantissant un contrôle strict des accès et des actions des utilisateurs.