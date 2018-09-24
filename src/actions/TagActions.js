import { 
    TAG_ADD,
    TAG_NAME_CHANGED,
    TAG_DELETE
 } from './types';

export const tagAdd = (tag) => {
    return {
        type: TAG_ADD,
        payload: tag
    };
};

export const tagNameChanged = (text) => {
    return {
        type: TAG_NAME_CHANGED,
        payload: text
    };
};

export const tagDelete = (tag) => {
    return {
        type: TAG_DELETE,
        payload: tag
    };
};
