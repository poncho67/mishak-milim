import * as React from 'react';
import { render } from 'react-dom';


function Another() {
  const [counter, setCounter] = React.useState(120);


  // Suggested by Laurent
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="App">
      <div>Countdown: {counter}</div>
    </div>
  );
}

export default Another;