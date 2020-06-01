function sorter(level, times){
  return function(a, b){
    if(a[level] > b[level]){
      return(-1);
    }
    else if(a[level] < b[level]){
      return(1);
    }
    else{
      if(a[times][a[times].length-1] < b[times][b[times].length-1]){
        return(-1);
      }
      else if(a[times][a[times].length-1] > b[times][b[times].length-1]){
          return(1);
      }
      else{
        return(0);
      }
    }
  }
}

module.exports = sorter;
