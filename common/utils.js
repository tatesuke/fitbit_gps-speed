// Add zero in front of numbers < 10
export function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
export function addClassName(elementOrElements, className) {
  const elements = (elementOrElements.length) ? elementOrElements : [elementOrElements];
  elements.forEach((e) => {
    const newClasses = e.class.split(' ');
    if (!newClasses.some((c)=> c === className)) {
      newClasses.push(className);
    }
    e.class = newClasses.join(' ');
  });
}

export function removeClassName(elementOrElements, className) {
  const elements = (elementOrElements.length) ? elementOrElements : [elementOrElements];
  elements.forEach((e) => {
    const newClasses =  e.class.split(' ').filter((c)=> c !== className);
    e.class = newClasses.join(' ');
  });
}