/**
 * A reference to a target resource.
 */
interface Link {
    href: string;
}

/**
 * A container for a collection of Links with convenience methods to manage them.
 */
export class RepresentationModel {
    private _links: { [relation: string]: Link } = {};

    addLink(relation: string, link: Link): void {
        this._links[relation] = link;
    }

    getLink(relation: string): Link | undefined {
        return this._links[relation];
    }

    hasLink(relation: string): boolean {
        return this._links[relation] !== undefined;
    }
}

/**
 * A resource that’s backed by a singular object or concept.
 */
export class EntityModel<T> extends RepresentationModel {
    private readonly _embedded: T;

    constructor(content: T) {
        super();
        this._embedded = content;
    }

    getContent(): T {
        return this._embedded;
    }
}

/**
 * A collection of resources. Its elements can either be simple objects or
 * RepresentationModel instances.
 */
export class CollectionModel<T> extends RepresentationModel {
    private readonly _embedded: Array<T>;

    constructor(content: Array<T>) {
        super();
        this._embedded = content;
    }

    getContent(): Array<T> {
        return this._embedded;
    }
}
