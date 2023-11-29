import { Injectable } from '@angular/core'
import {
    ActivatedRoute,
    NavigationEnd,
    PRIMARY_OUTLET,
    RouteConfigLoadEnd,
    Router,
    Scroll,
} from '@angular/router'
import { Observable } from 'rxjs'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'

export interface Breadcrumb {
    label: string
    url: string
    icon: string
}

/**
 * This service is used to generate breadcrumbs.
 */
@Injectable({
    providedIn: 'root',
})
export class BreadcrumbsService {
    public items$: Observable<Breadcrumb[]>

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private route: ActivatedRoute
    ) {
        this.items$ = this.getBreadcrumbs()
    }

    /**
     * Get breadcrumbs
     *
     * @returns {Observable<Breadcrumb[]>}
     */
    getBreadcrumbs() {
        return this.router.events.pipe(
            filter(event => {
                return (
                    event instanceof NavigationEnd ||
                    event instanceof RouteConfigLoadEnd ||
                    event instanceof Scroll
                )
            }),
            distinctUntilChanged(),
            map(() => {
                return this.getBreadcrumb(this.route.root)
            })
        )
    }

    /**
     * Get breadcrumb for a route
     * @param route The route to get breadcrumb for
     * @param url The route's URL segment
     * @param breadcrumbs The breadcrumbs
     * @returns The breadcrumbs
     */
    private getBreadcrumb(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: Breadcrumb[] = []
    ): Breadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb'

        const children: ActivatedRoute[] = route.children

        // Iterate over each child
        for (const child of children) {
            // Verify this is the primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue
            }

            // Verify the custom data property "breadcrumb" is specified on the route
            // eslint-disable-next-line no-prototype-builtins
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumb(child, url, breadcrumbs)
            }

            // Get the route's URL segment
            const routeURL: string = child.snapshot.url
                .map(segment => segment.path)
                .join('/')

            // Append route URL to URL

            url += routeURL === '' ? '' : `/${routeURL}`
            if (!child.snapshot.data['active']) {
                return this.getBreadcrumb(child, url, breadcrumbs)
            }
            // Add breadcrumb
            const breadcrumb: Breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                url: url,
                icon: child.snapshot.data['icon'],
            }
            breadcrumbs.push(breadcrumb)

            // Recursive
            return this.getBreadcrumb(child, url, breadcrumbs)
        }

        return breadcrumbs
    }
}
