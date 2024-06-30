export  const GetBudget = (item) =>{
    // console.log('max budget is', item.maxBudget)
    // console.log('min budget is', item.minBudget)
    if(item.minBudget === 0 && item.maxBudget === 20){
        return "$"
    } else if(item.minBudget === 20 && item.maxBudget === 50){
        return "$$"
    }else if(item.minBudget === 50 && item.maxBudget === 80){
        return "$$$"
    }else if(item.minBudget === 80 && item.maxBudget ===10000000){
        return "$$$$"
    }
}