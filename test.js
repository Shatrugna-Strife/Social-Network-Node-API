function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
  }
  
  async function asyncCall1() {
    console.log('calling1');
    const result = await resolveAfter2Seconds();
    console.log(result,"2");
    // expected output: "resolved"
  }
  async function asyncCall2() {
    console.log('calling2');
    const result = await resolveAfter2Seconds();
    console.log(result,"2");
    // expected output: "resolved"
  }
  
  asyncCall1();
  asyncCall2();
  let i = 0;
  while(i<=100000000000){
    //console.log(i);
    i++;
  }