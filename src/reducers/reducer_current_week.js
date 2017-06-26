import { NEXT_WEEK, PREVIOUS_WEEK, CURRENT_WEEK } from '../actions/types';

const INITIAL_DATA = { displayMonths: '', days: [] }

export default function( state = INITIAL_DATA, action ) {
    switch(action.type) {
        case CURRENT_WEEK:
            const currentWeek = action.payload;
            return currentWeek;
        case NEXT_WEEK:
            const nextWeek = action.payload;
            return nextWeek;
        case PREVIOUS_WEEK:
            const previousWeek = action.payload;
            return previousWeek;
          }
          return state;
}
