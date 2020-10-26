/** A reference to a target resource */
export interface Link {
    href: string;

    // ----- Not implemented -----
    // rel: LinkRelation (we implement this directly as a string in LinkMap, e.g. "self", "createOrder")
    // deprecation: string
    // hrefLang: string
    // media: string
    // name: string
    // profile: string
    // template: UriTemplate
    // title: string
    // type: string (media type expected when dereferencing the target resource, e.g. "application/hal+json")
}

/**
 * A map of links, keyed by a relation name. For example,
 * _links: {
 *     "self": { "href": "/orders" },
 *     "createOrder": { "href": "/orders" }
 * }
 */
export interface LinkMap {
    [relation: string]: Link;
}
