import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";


function App(props) {
    return (
        <div className="App">
            <h1>Hi</h1>
        </div>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         socket: state.socket,
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         connectSocket: () => {
//             dispatch(connectSocket());
//         }
//     }
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
