import { Link, LinkMap } from './Link';

/** A container for a collection of Links */
export interface RepresentationModel {
    _links: LinkMap;
}

/* eslint-disable @typescript-eslint/no-redeclare */
export const RepresentationModel = {
    addLink: (model: RepresentationModel, relation: string, href: string) => {
        model._links[relation] = { href };
    },

    addLinks: (model: RepresentationModel, linkMap: LinkMap) => {
        for (const [relation, link] of Object.entries(linkMap)) {
            model._links[relation] = link;
        }
    },

    getLink(model: RepresentationModel, relation: string): Link | undefined {
        return model._links[relation];
    },

    hasLink(model: RepresentationModel, relation: string): boolean {
        return model._links[relation] !== undefined;
    },
};
