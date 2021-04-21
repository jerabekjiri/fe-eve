export const publicRoutes = [
    {route: 'domu', component: 'home', title: 'Domů'},
    {route: 'objednavka/:id', component: 'purchase', title: 'Objednávka'},
    {route: 'login', component: 'login', title: 'Login', restricted: true},
    {route: 'registrace', component: 'registration', title: 'Registrace', restricted: true},
    {route: 'informace', component: 'information', title: 'Informace'},
    {route: 'o-projektu', component: 'about-project', title: 'O projektu'},
    {route: '', component: 'home', title: 'Domů'}
]

export const privateRoutes = [
    {route: 'profil/:tab', component: 'my-profile', title: 'Můj profil'},
]

