// The interfaces in this file are based on:
// 1. JSON Hypertext Application Language (https://tools.ietf.org/id/draft-kelly-json-hal-05.xml#link-objects)
// 2. Spring HATEOAS: https://docs.spring.io/spring-hateoas/docs/1.2.0-RC1/api/

/** A reference to a target resource */
export interface Link {
    href: string;

    // ----- Not implemented -----
    // deprecation: string
    // hrefLang: string
    // media: string
    // name: string
    // profile: string
    // rel: LinkRelation
    // template: UriTemplate
    // title: string
    // type: string
}

/**
 * A map of links, keyed by a relation name. For example,
 * _links: {
 *     "self": { "href": "/orders" },
 *     "create": { "href": "/orders" }
 * }
 */
export interface LinkMap {
    [relation: string]: Link;
}

/** A container for a collection of Links */
export interface RepresentationModel {
    _links: LinkMap;
}

/** A resource that’s backed by a singular object or concept */
export interface EntityModel<T> extends RepresentationModel {
    entity: T;
}

/**
 * A collection of resources. Its elements can either be simple objects or
 * RepresentationModel instances.
 */
export interface CollectionModel<T> extends RepresentationModel {
    collection: Array<T>;
}
