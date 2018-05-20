export default function list(state = {}, action) {
    let newState;
    console.log('in list reducer: ', action.type);
    switch (action.type) {
        
        case 'ADD_TODO':
            let todolist = JSON.parse(sessionStorage.getItem('todolist'));
            if(todolist === null) {
                todolist = [action.payload];
                sessionStorage.setItem('todolist', JSON.stringify(todolist));
            } else {
                todolist.unshift(action.payload);
                sessionStorage.setItem('todolist', JSON.stringify(todolist));
            }
            newState = { ...state, list: todolist };
        break;

        case 'FETCH_TODO_ALL':
            let todolistAll = [];
             todolistAll = JSON.parse(sessionStorage.getItem('todolist'));
             newState = { ...state, list: todolistAll };
        break;

        case 'FETCH_TODO_ACTIVE':   
            let todolistActive = [];
            todolistActive = JSON.parse(sessionStorage.getItem('todolist')).filter((todo) => {
                return todo.status === 'active';
            });
            newState = { ...state, list: todolistActive };
        break;

        case 'FETCH_TODO_COMPLETE':
            let todolistComplete = [];
            todolistComplete = JSON.parse(sessionStorage.getItem('todolist')).filter((todo) => {
                return todo.status === 'complete';
            });
            newState = { ...state, list: todolistComplete };
        break;
                
        case 'MARK_TASK':
            let todolistMark = JSON.parse(sessionStorage.getItem('todolist'));
            console.log('mark task action.payload: ', action.payload);
            todolistMark.forEach((element, index) => {
                console.log('index: ', index);
                if(index === parseInt(action.payload)) {
                    console.log('index === action.payload');
                    console.log('element: ', element);
                    if(element.status === 'active') {
                        console.log('element status if');
                        element.status = 'complete'
                    }
                    else {
                        console.log('element status else');
                        element.status = 'active';
                    }
                }
            });
            newState = { ...state, list: todolistMark };
            sessionStorage.setItem('todolist', JSON.stringify(todolistMark));
        break;
        
        default:
            newState = { ...state };
        break;
    }
    return newState;
};