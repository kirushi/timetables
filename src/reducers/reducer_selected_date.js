import { SELECTED_DATE } from '../actions/types';

export default function( state = null, action ) {
    switch(action.type) {
        case SELECTED_DATE:
            const selectedDate = action.payload;
            return selectedDate;
    }
    return state;
}
