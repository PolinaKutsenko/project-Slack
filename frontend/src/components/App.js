import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increment } from '../slices/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
        <p>
          Edit
        </p>
        <button onClick={() => dispatch(increment())}>+</button>
        <p>{count}</p>
    </div>
  );
}

export default App;
