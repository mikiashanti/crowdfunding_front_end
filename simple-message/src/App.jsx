import React from 'react';

function App() {
    const [message, setMessage] = React.useState("JavaScript is so cool.");
    
    function handleClick() {
        setMessage("I love React");
    }

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={handleClick}>Update the message!</button>
        </div>
    );
}

export default App;