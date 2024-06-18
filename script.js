const input = document.getElementById('input'),
      defaultResult = document.getElementById('default-result'),
      debounceResult = document.getElementById('debounce-result'),
      throttleRsult = document.getElementById('throttle-result'),
      debounceNumber = document.getElementById('debounce-number'),
      throttleNumber = document.getElementById('throttle-number');

      
const updatedDebounce = debounceFn(
  text => handleChange(debounceResult),
  3000
)

const updatedThrottle = throttleFn(
  text => handleChange(throttleRsult),
  3000
)

input.addEventListener('input' , (e)=> {
  handleChange(defaultResult);
  updatedDebounce(e.target.value);
  updatedThrottle(e.target.value);
})



function handleChange(targetP) {
  targetP.innerText = input.value;
}


function debounceFn (fn,delay){
  let timeout;
   return ()=> {
    clearTimeout(timeout)  
    timeout = setTimeout(()=> fn() , delay)
   }
}

/************************************ */

function throttleFn(fn,delay) {
  let shouldWait = false;
  let savedValues;

  const timeoutFnc =  ()=> {
    if (!savedValues) {
      shouldWait = false
    }
    else{
      fn(...savedValues);
      savedValues = null;
      setTimeout(timeoutFnc, delay)
    }
  }

  return (...args)=>{
    if (shouldWait) {
      savedValues = args;
      return
    }

    fn(...args);
    shouldWait = true;

    setTimeout(timeoutFnc, delay)
  }
}

/****************  another throttle   ************** */

// this is the real example cuz the last one more fit debounce not throttle 


const updatedThrottleTwo = throttleFnTwo(
  ()=> increment(throttleNumber),
  1000
)

const updatedDebounceTwo = debounceFnTwo(
  ()=> increment(debounceNumber),
  1000
)

window.addEventListener('mousemove' , ()=>{
  updatedThrottleTwo()
  updatedDebounceTwo()
})

function increment(ele) {
  ele.textContent  = parseInt(ele.innerText || 0) + 1;
}


function throttleFnTwo(fn , delay) {
  let shouldWait = false;
  let savedValues;

  const timeoutFnc = ()=>{
    if (!savedValues) {
      shouldWait = false;
    }
    else{
      fn(...savedValues);
      savedValues = null;
      setTimeout(timeoutFnc , delay)
    }
  }

  return (...args)=>{
    if (shouldWait) {
       savedValues = args;
       return 
    }

    fn(...args);
    shouldWait = true;

    setTimeout(timeoutFnc , delay)
  }
}

function debounceFnTwo (fn,delay){
  let timeout;
   return ()=> {
    clearTimeout(timeout)  
    timeout = setTimeout(()=> fn() , delay)
   }
}


