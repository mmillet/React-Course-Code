import React from 'react';

class Demo extends React.Component {
  render() {
    const num = 2 * 3;
    return (
      <>
        {1 + 1}
        <div>
          2 * 3 = iiii
          {[1, 2, 3].map((num, index) => {
            return (
              <div key={num}>
                {/* {num}:{index} */}
                {/* {`${num}:${index * 5}`} */}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// class Demo extends React.Component {
//   render() {
//     const list = [1, 2, 3];
//     return (
//       <div>
//         {list.map(item => (
//           <span>{item}</span>
//         ))}
//       </div>
//     );
//   }
// }

// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         {/* 这才是注释 */}
//         <span>注释</span>
//       </div>
//     );
//   }
// }

export default Demo;
