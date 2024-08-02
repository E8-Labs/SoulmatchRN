export const GetSubscriptionPlan = (item) =>{
    let sub = item
    if(sub.isSubscribed === true){
        if(sub.subscriptionDetails.plan === "WeeklySubsciptionSoulmatch0623"){
            return "Weelky"
        } else if(sub.subscriptionDetails.plan === "MonthlySubsciptionSoulmatch0623"){
            return "Monthly"
        } else if(sub.subscriptionDetails.plan === "YearlySubsciptionSoulmatch0623"){
            return "Yearly"
        }else{
            return "Free"
        }
    }else{
        return "Free"
    }
}