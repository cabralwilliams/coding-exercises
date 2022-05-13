//You will need to import the actions from ./actions

/*
When I've created reducers using redux, I have done so by passing two parameters to it:
state and action
*/
/*An action object has a property called type associated with it, but then just about any other property
can be attached as needed
*/

export const reducer = (state, action) => {
    switch(action.type) {
        default:
           return state;
    }
}