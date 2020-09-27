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
    private links: { [relation: string]: Link } = {};

    addLink(relation: string, link: Link): void {
        this.links[relation] = link;
    }

    getLink(relation: string): Link | undefined {
        return this.links[relation];
    }

    hasLink(relation: string): boolean {
        return this.links[relation] !== undefined;
    }
}

/**
 * A resource that’s backed by a singular object or concept.
 */
export class EntityModel<T> extends RepresentationModel {
    private readonly content: T;

    constructor(content: T) {
        super();
        this.content = content;
    }

    getContent(): T {
        return this.content;
    }
}

/**
 * A collection of resources. Its elements can either be simple objects or
 * RepresentationModel instances.
 */
export class CollectionModel<T> extends RepresentationModel {
    private readonly content: Array<T>;

    constructor(content: Array<T>) {
        super();
        this.content = content;
    }

    getContent(): Array<T> {
        return this.content;
    }
}
