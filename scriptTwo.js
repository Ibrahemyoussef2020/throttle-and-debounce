const input = document.getElementById('input'),
      defaultResult = document.getElementById('default-result'),
      debounceResult = document.getElementById('debounce-result'),
      throttleRsult = document.getElementById('throttle-result'),
      debounceNumber = document.getElementById('debounce-number'),
      throttleNumber = document.getElementById('throttle-number');

      
/* Throttle */

const useThrottle = (callbackFn , delay)=>{
  let PrevRequstTime = 0;

  return (...args)=>{
    const now = Date.now();
    const delteTime = now - PrevRequstTime;

    if (delay >= delteTime) return
    
    PrevRequstTime = now;
    callbackFn(...args);
  }
}

/* Debounce */

const useDebounce = (callbackFn , delay)=>{
  let timer;

  return (...args)=>{

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(()=>{
      callbackFn(...args)
    },delay)

  }
}

const fillText = (ele)=>{
  ele.innerHTML = input.value;
}


const updatedThrottle = useThrottle(()=>fillText(throttleRsult),1000);
const updatedDebounce = useDebounce(()=>fillText(debounceResult),1000); 


const collectMethod = ()=>{
  fillText(defaultResult);
  updatedThrottle();
  updatedDebounce();
}


input.addEventListener('input' , collectMethod)

console.log(throttleRsult);
